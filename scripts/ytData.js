
const APIKEY='AIzaSyDxfDaZzQ56ij2bfN6hZwVDxsICVCmplQw';
var videos=[];
const videoIds=[];
var page;


            
          function execute() {
            return gapi.client.youtube.search.list({
                "part": "snippet",
             "channelId":"UCbwIKdzXA8XnaExTVcshXCw",
             "order":"date",
             "type":"video",

         
             
            
            
                  }).then(function processResponce(response){
                    console.log("Response", response);
                  
                    videos=response.result.items;
                   page=videos.nextPageToken;
                
                   for(let a=0;a<4;a++){
                    videoIds.push(videos[a].id.videoId);
                  }
                  console.log(videoIds);
                  console.log(videoIds);
                  
                  return videoIds;
                  }),
                  function(err){(console.log("Error", err))};
                  
                }
            
          
            
           function handleClientLoad(){
           
            gapi.client.setApiKey(APIKEY);
            gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
                    .then(function() {
                 console.log("GAPI client loaded for API"); 
                 execute();
                  
           
                  },
              function(err) 
              { console.error("Error loading GAPI client for API", err); });;

         
                }

               
              

            