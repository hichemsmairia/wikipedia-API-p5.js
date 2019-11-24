let searchURL = "http://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch="
let contentURL= "http://en.wikipedia.org/w/api.php?action=query&format=json&prop=revisions&rvprop=content&rvsection=0&titles="
let userInput ;
let btn ;

function setup ()
{

noCanvas() ; 
userInput = select ("#userinput")

var button = createButton("clear all ")


userInput.changed(gowiki)

function gowiki ()
{
  let term = userInput.value() ; 
  let url = searchURL + term ; 
  loadJSON(url , gotdata ,"jsonp") ;
}
 function gotdata (data )
 {
  var dataq = data.query.search[0]
  var title = dataq.title ;
  title = title.replace(/\s+/g,'_')
  let content = contentURL + title ;
  loadJSON(content , gotcontent ,'jsonp')
  var mytitle = createP(title) ;
    
   }

 function gotcontent (fulldata)
 {
  let page = fulldata.query.pages ; 
  let pageID = Object.keys(fulldata.query.pages)[0]; 
  
  let content = page[pageID].revisions[0]['*'] ; 
  
  var mycontent = createP(content)
button.mousePressed(()=>{mycontent.remove() })
 }
}