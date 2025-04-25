import { ExtensionPanel, Modal } from '@/components/common';
import { Extension } from '@/core/extensions';
import { TranslationKey, useTranslation } from '@/i18n';
import { useToggle, formatDateTime, parseTwitterDateTime } from '@/utils/common';
import { options } from '@/core/options';
import { useState, useEffect } from 'preact/hooks';
import { JSX } from 'preact';
import { User, Tweet } from '@/types';
import { extractTweetMedia, formatTwitterImage, getMediaOriginalUrl, extractRetweetedTweet, extractQuotedTweet } from '@/utils/api';
import { db } from '@/core/database';
import logger from '@/utils/logger';

interface ProcessedData {
  [key: string]: any;
}

export type AllLinksUIProps = {
  extension: Extension;
};

export function AllLinksUI({ extension }: AllLinksUIProps) {
  const { t } = useTranslation();
  const [showModal, toggleShowModal] = useToggle();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [linkdatas, setLinkdatas] = useState<Tweet[]>([]);
  const [clipboardLoaded, setClipboardLoaded] = useState(false);
  const [lastUsername, setLastUsername] = useState<string>("");
  const [selection, setSelection] = useState<string>("用户推文");

  // 直接从数据库获取数据的状态
  const [userTweetsData, setUserTweetsData] = useState<Tweet[]>([]);
  const [bookmarksData, setBookmarksData] = useState<Tweet[]>([]);
  const [searchData, setSearchData] = useState<Tweet[]>([]);
  const [detailrecords, setDetailrecords] = useState<Tweet[]>([]);

  //const title = t(extension.name.replace('Module', '') as TranslationKey); //AllLinks
  const title = "自动采集详情"; 

  // 默认使用UserTweetsModule作为数据源
  const [dataSource, setDataSource] = useState<string>("UserTweetsModule");
  
  // 根据当前选择的数据源获取对应的数据
  const datas = dataSource === "UserTweetsModule" ? userTweetsData : 
                dataSource === "BookmarksModule" ? bookmarksData : 
                dataSource === "SearchTimelineModule" ? searchData : [];

  // 直接从数据库加载数据的函数
  const loadDataFromDB = async () => {
    try {
      // 加载UserTweetsModule数据
      const userTweets = await db.extGetCapturedTweets("UserTweetsModule");
      setUserTweetsData(userTweets || []);
      
      // 加载BookmarksModule数据
      const bookmarks = await db.extGetCapturedTweets("BookmarksModule");
      setBookmarksData(bookmarks || []);
      
      // 加载SearchTimelineModule数据
      const search = await db.extGetCapturedTweets("SearchTimelineModule");
      setSearchData(search || []);
      
      // 加载TweetDetailModule数据
      const details = await db.extGetCapturedTweets("TweetDetailModule");
      setDetailrecords(details || []);
      
      logger.debug('数据库数据加载完成', {
        userTweets: userTweets?.length,
        bookmarks: bookmarks?.length,
        search: search?.length,
        details: details?.length
      });
    } catch (error) {
      logger.error('从数据库加载数据失败', error);
    }
  };

  // 组件挂载和数据源变化时重新加载数据
  useEffect(() => {
    loadDataFromDB();
    // 设置定时器定期刷新数据
    const intervalId = setInterval(loadDataFromDB, 5000); // 每5秒刷新一次
    
    return () => clearInterval(intervalId); // 组件卸载时清除定时器
  }, []);


  const getCurrentTweetUrl = () => {
    if (items && items[currentIndex] && items[currentIndex].rest_id) {
      const item = items[currentIndex];
      const screenName = (item.__typename === 'Tweet')
        ? item.core?.user_results?.result?.legacy?.screen_name
        //: record.legacy?.screen_name;
        : null;
      return screenName
        ? `https://twitter.com/${screenName}/status/${items[currentIndex].rest_id}`
        : `https://twitter.com/i/web/status/${items[currentIndex].rest_id}`;
    }
    return '#';
  };

  /*
  const tableData = records?.map(record => ({
    url: getCurrentTweetUrl(),
    data: record
  })) || [];*/

  const handleRollingLinkClick = (e: JSX.TargetedMouseEvent<HTMLAnchorElement>) => {

    console.log("[all-links>>ui.tsx] handleRollingLinkClick currentIndex: ", currentIndex);
    e.preventDefault();

    /* 导出并清空推文详情模块全部数据
    if(currentIndex == 0) {
      console.log("[all-links>>ui.tsx] handleRollingLinkClick export and clear ...");
      if(detailrecords && detailrecords.length > 0)
        {
        exportTweetDetailsData({patchname: "autobak"});
        clearTweetDetailsData();
      }
    }*/

    console.log("[all-links>>ui.tsx] handleRollingLinkClick currentIndex: ", currentIndex);
    console.log("[all-links>>ui.tsx] handleRollingLinkClick isDownloaded: ", isDownloaded);
    if (items && items[currentIndex] && currentIndex <= items.length - 1) {
      
      const record = items[currentIndex];

      const screenName = (record.__typename === 'Tweet')
        ? record.core?.user_results?.result?.legacy?.screen_name
        : null;
        //: (record as User).legacy?.screen_name;

      setLastUsername(screenName || "");

        const tweetUrl = screenName
        ? `https://twitter.com/${screenName}/status/${items[currentIndex].rest_id}`
        : `https://twitter.com/i/web/status/${items[currentIndex].rest_id}`;

      window.open(tweetUrl, '_blank');
      setCurrentIndex((prevIndex: number) => prevIndex + 1);

    } else if (!isDownloaded) {
      //当全部链接被点击打开过之后，在最后一次点击时: 导出推文详情数据
      const patchname = selection == "用户推文" ? lastUsername : "其他推文";
      exportTweetDetailsData({patchname: patchname});
      setIsDownloaded(true);
    } else {
      console.log("[all-links>>ui.tsx] handleRollingLinkClick currentIndex: ", currentIndex);
      console.log("[all-links>>ui.tsx] handleRollingLinkClick items.length: ", items?.length);
    }
  };
  
  let atag:any;

  // 从剪贴板读取需要采集的数据的函数
  const loadFromClipboard = async () => {
    try {
      // 从剪贴板读取文本
      const text = await navigator.clipboard.readText();
      logger.debug('从剪贴板读取文本', text);
      
      // 按行分割文本
      const lines = text.split('\n').filter(line => line.trim() !== '');
      
      if (lines.length > 0) {
        // 为每个URL创建Tweet对象
        const tweetObjects = lines.map(url => {
          // 从URL中提取推文ID和用户名
          const match = url.match(/(?:twitter\.com|x\.com)\/([^/]+)\/status\/([0-9]+)/);
          if (!match) return null;
          
          const screenName = match[1];
          const tweetId = match[2];
          
          // 创建简化的Tweet对象结构，添加所有必需的属性
          return {
            "__typename": "Tweet",
            "rest_id": tweetId,
            "legacy": {
              "entities": {
                "urls": [],
                "media": []
              },
              "created_at": new Date().toString(),
              "full_text": "",
              "favorite_count": 0,
              "favorited": false,
              "retweet_count": 0,
              "retweeted": false,
              "user_id_str": "",
              "id_str": tweetId || "",
              "is_quote_status": false,
              "lang": "",
              "quote_count": 0,
              "reply_count": 0,
              "conversation_id_str": "",
              "display_text_range": [0, 0],
              "bookmark_count": 0,
              "bookmarked": false,
              "possibly_sensitive": false,
              "possibly_sensitive_editable": false
            },
            "core": {
              "user_results": {
                "result": {
                  "__typename": "User",
                  "legacy": {
                    "screen_name": screenName
                  }
                }
              }
            },
            "edit_control": {
              "edit_tweet_ids": [],
              "editable_until_msecs": "0",
              "is_edit_eligible": false,
              "edits_remaining": "0"
            },
            "is_translatable": false,
            "views": {
              "state": "Enabled"
            },
            "source": "",
            "twe_private_fields": {
              "created_at": Date.now(),
              "updated_at": Date.now(),
              "media_count": 0
            }
          };
        }).filter(tweetx => tweetx !== null);
        
        if (tweetObjects.length > 0) {
          setLinkdatas(tweetObjects as unknown as Tweet[]);
          setClipboardLoaded(true);
          logger.debug('从剪贴板加载数据成功，记录数', tweetObjects.length);
          return;
        } else {
          logger.error("未能从URL中提取有效的推文信息");
        }
      } else {
        logger.error("剪贴板内容为空或格式不正确");
      }
    } catch (e) {
      logger.error("读取剪贴板失败:", e);
    }
    setLinkdatas([]);
    return;
  };
  
  // 组件加载时自动尝试从剪贴板读取数据
  useEffect(() => {
    loadFromClipboard();
  }, []);
  
  //用于清空推文详情数据:
  const clearTweetDetailsData = async () => {
    logger.debug('清空推文详情数据');
    return db.extClearCaptures("TweetDetailModule");
  };

  //导出推文详情数据函数:
  const exportTweetDetailsData = async ({patchname}: {patchname: string}) => {
      // 导出推文详情数据
      const processExportData = () => {
        // 返回处理后的推文数据
        return detailrecords?.map(record => {
          // 创建符合标准格式的导出数据
          const screenName = (record.__typename === 'Tweet')
            ? record.core?.user_results?.result?.legacy?.screen_name
            : null;
          
          // 检查记录类型
          const isTweet = record.__typename === 'Tweet';
          
          // 获取创建时间
          const createdAt = record.legacy?.created_at 
            ? formatDateTime(
                parseTwitterDateTime(record.legacy.created_at),
                options.get('dateTimeFormat')
              ) 
            : null;
          
          // 获取全文
          const fullText = isTweet 
            ? record.legacy?.full_text || record.note_tweet?.note_tweet_results?.result?.text || ''
            : '';
          
          // 获取媒体信息
          const media = isTweet 
            ? extractTweetMedia(record).map(media => ({
                type: media.type,
                url: media.url,
                thumbnail: formatTwitterImage(media.media_url_https, 'thumb'),
                original: getMediaOriginalUrl(media),
                ext_alt_text: media.ext_alt_text
              }))
            : [];
          
          // 获取用户信息
          const name = isTweet 
            ? record.core?.user_results?.result?.legacy?.name 
            : null;
          
          const profileImageUrl = isTweet 
            ? record.core?.user_results?.result?.legacy?.profile_image_url_https 
            : null;
          
          // 获取推文交互信息
          const inReplyTo = isTweet ? record.legacy?.in_reply_to_status_id_str : null;
          const retweetedStatus = isTweet ? extractRetweetedTweet(record)?.rest_id : null;
          const quotedStatus = isTweet ? extractQuotedTweet(record)?.rest_id : null;
          
          // 获取推文统计信息
          const favoriteCount = isTweet ? record.legacy?.favorite_count : null;
          const retweetCount = isTweet ? record.legacy?.retweet_count : null;
          const bookmarkCount = isTweet ? record.legacy?.bookmark_count : null;
          const quoteCount = isTweet ? record.legacy?.quote_count : null;
          const replyCount = isTweet ? record.legacy?.reply_count : null;

          const viewsCount = isTweet && typeof record.views?.count !== 'undefined' 
            ? record.views?.count 
            : null;
          
          // 获取用户交互状态
          const favorited = isTweet ? record.legacy?.favorited : null;
          const retweeted = isTweet ? record.legacy?.retweeted : null;
          const bookmarked = isTweet ? record.legacy?.bookmarked : null;
          
          // 构建URL
          const url = screenName
            ? `https://twitter.com/${screenName}/status/${record.rest_id}`
            : `https://twitter.com/i/web/status/${record.rest_id}`;
          
          // 构建与 export-data.tsx 中 onExport 函数导出格式一致的数据
          return {
            id: record.rest_id,
            created_at: createdAt,
            full_text: fullText,
            media: media,
            screen_name: screenName,
            name: name,
            profile_image_url: profileImageUrl,
            in_reply_to: inReplyTo,
            retweeted_status: retweetedStatus,
            quoted_status: quotedStatus,
            favorite_count: favoriteCount,
            retweet_count: retweetCount,
            bookmark_count: bookmarkCount,
            quote_count: quoteCount,
            reply_count: replyCount,
            views_count: viewsCount,
            favorited: favorited,
            retweeted: retweeted,
            bookmarked: bookmarked,
            url: url
          };
        });
      };
      
      const exportData = processExportData();
      
      if (exportData) {
        const filename = `tweet_details_${selection}_${patchname}_${Date.now()}.json`;
        logger.debug('导出推文详情数据文件名', filename);

        // 复制文件名到剪贴板
        navigator.clipboard.writeText(filename).catch(console.error);
        
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
  };

  const items = clipboardLoaded ? linkdatas : datas;
  const buttons = (
    <div>
    <div className="mb-3">
      <button
        class="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={() => {          
          exportTweetDetailsData({patchname: "autobak"}).then(() => {
            clearTweetDetailsData();
            // 清除完成后重置状态
            setCurrentIndex(0);
            setIsDownloaded(false);
          });
        }}
      >
        当前推文详情数量: {detailrecords?.length} , 备份并清空推文详情模块数据(谨慎操作)
      </button>
      </div>
      <div className="mb-3">
      <button
        class="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={() => {
          // 使用剪贴板中的数据作为数据源
          loadFromClipboard().then(() => {
            setDataSource("未选");
            setCurrentIndex(0);
            setIsDownloaded(false);
          });
          setSelection("剪贴板");
        }}
      >
        自动采集剪贴板中的推文详情数据
      </button>
      </div>
      <div className="mb-3">
      <button
        class="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={() => {
          // 使用UserTweetsModule的数据作为数据源
          setLinkdatas([]);
          setClipboardLoaded(false);
          setDataSource("UserTweetsModule");
          setCurrentIndex(0);
          setIsDownloaded(false);
          setSelection("用户推文");
        }}
      >
        自动采集[用户]推文详情数据
      </button>
      </div>
      <div className="mb-3">
      <button
        class="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={() => {
          // 使用BookmarksModule的数据作为数据源
          setLinkdatas([]);
          setClipboardLoaded(false);
          setDataSource("BookmarksModule");
          setCurrentIndex(0);
          setIsDownloaded(false);
          setSelection("标签");
        }}
      >
        自动采集[书签]推文详情数据
      </button>
      </div>
      <div className="mb-3">
      <button
        class="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={() => {
          // 使用SearchModule的数据作为数据源
          setLinkdatas([]);
          setClipboardLoaded(false);
          setDataSource("SearchTimelineModule");
          setCurrentIndex(0);
          setIsDownloaded(false);
          setSelection("搜索结果");
        }}
      >
        自动采集[搜索结果]推文详情数据
      </button>
      </div>
    </div>
  );


  if(items && items.length > 0){
    
    let dynamictext = '';
    if(currentIndex <= items.length - 1 ){
      dynamictext = "当前选项:" + `${selection}` + ", 链接数: " + `${items.length}` + ", 当前数据:" + items[currentIndex]?.rest_id + "(" + (items.length - currentIndex) + ")";
    } else {
      dynamictext = isDownloaded  ? `${selection}` + "推文详情文件下载完成" 
      : "没有更多链接了，点击导出全部推文详情数据";
    }


    const linkElement = (
      <a
        href={getCurrentTweetUrl()}
        onClick={handleRollingLinkClick}
        class="text-blue-500 hover:text-blue-700 underline"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`rollinglink-${items.length}`}
      >
        {dynamictext}
      </a>
    );

    if(currentIndex == 0){
      atag = (
        <div>
          {linkElement}
          {buttons}
        </div>

      );
    } else {
      atag = linkElement;
    }

  } else {
    atag = (
      <div>
        <div>当前选项[{selection}]没有数据</div>
        {buttons}
        </div>
    );
  }


/*
    { ? (
      <a
        href={getCurrentTweetUrl()}
        onClick={handleRollingLinkClick}
        class="text-blue-500 hover:text-blue-700 underline"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`rollinglink-${records.length}`}
        data-total-records={`${records.length}`}
      >
        {dynamictext}
      </a>
    ) : null}*/

  //Extension Panel
  //{/*class="max-w-4xl md:max-w-screen-md sm:max-w-screen-sm min-h-[512px]"*/}
  return (
    <ExtensionPanel
      title={title}
      description={'Click to view all links'}
      active={false}
      onClick={toggleShowModal} //在ExtensionPanel中的button上加载，点击后显示Modal
      aria-label="All Links Menu" //不显示，不能传到下面的ExtensionPanel
      data-ExtensionPanel-title={title} //不显示，不能传到下面的ExtensionPanel
    >
      <Modal
        class="fixed inset-0 w-full h-full z-50 bg-white dark:bg-gray-800 overflow-auto flex flex-col"
        title={`${title}(刷新或点击关闭按钮可关闭此页)`}
        show={showModal}
        onClose={toggleShowModal}
      >
        <div class="flex-1 p-4 overflow-y-auto">
          {atag}
        </div>
      </Modal>
    </ExtensionPanel>
  );
}


      /*const text = `[
        {
          "__typename": "Tweet",
          "rest_id": "1234567890123456789",
          "legacy": {
            "created_at": "Wed Oct 10 20:19:24 +0000 2023",
            "full_text": "这是一条示例推文内容 #标签",
            "favorite_count": 42,
            "retweet_count": 12,
            "bookmark_count": 5,
            "quote_count": 3,
            "reply_count": 7,
            "favorited": false,
            "retweeted": false,
            "bookmarked": false,
            "entities": {
              "urls": [],
              "media": []
            }
          },
          "core": {
            "user_results": {
              "result": {
                "__typename": "User",
                "legacy": {
                  "screen_name": "example_user",
                  "name": "示例用户",
                  "profile_image_url_https": "https://pbs.twimg.com/profile_images/example.jpg"
                }
              }
            }
          },
          "views": {
            "count": "1024"
          }
        }
      ]`*/


      /*
      const text = `[
        {
          "__typename": "Tweet",
          "rest_id": "1897982594924319141",
          "legacy": {
            "entities": {
              "urls": [],
              "media": []
            }
          },
          "core": {
            "user_results": {
              "result": {
                "__typename": "User",
                "legacy": {
                  "screen_name": "XiaoNianTalk"
                }
              }
            }
          }
        }
      ]`;*/
