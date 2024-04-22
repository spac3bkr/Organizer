//CHECK SELECTIONS
//================
var selectedItems = app.project.selection;

for (var i = 0; i < selectedItems.length; i++) {

    var item = selectedItems[i];

    if(item.typeName != "Composition"){//CHECK IF INSTANCEOF WORKS

        selectedItems.splice(i, 1);
                   
    }
            
}

// ARRANGE FUNCTION
// ================
function arrange(){

    var selectedItems = [];
    var footage = [];

    //SAVE BEFORE ARRANGE
    //===================
    var currentProjectPath = app.project.file;
    app.project.save(currentProjectPath);


    //PUSH ITEMS TO ARRAY
    //===================
    for (var i = 1; i <= app.project.items.length; i++) {
        
        var item = app.project.item(i).id;
        footage[footage.length] = item;
     
    }

    //CREATE FOLDER STRUCTURE
    //=======================
    var assetsFolder = app.project.items.addFolder("Assets");

    //ORGANIZE FOLDERS
    //================
    var imagesFolder = app.project.items.addFolder("Images");
    imagesFolder.parentFolder = assetsFolder;

    var graphicsFolder = app.project.items.addFolder("Graphics");
    graphicsFolder.parentFolder = assetsFolder;

    var videoFolder = app.project.items.addFolder("Video");
    videoFolder.parentFolder = assetsFolder;

    var audioFolder = app.project.items.addFolder("Audio");
    audioFolder.parentFolder = assetsFolder;

    var swfFolder = app.project.items.addFolder("Swf");
    swfFolder.parentFolder = assetsFolder;

    var solidsFolder = app.project.items.addFolder("Solids");
    solidsFolder.parentFolder = assetsFolder;

    var compsFolder = app.project.items.addFolder("Comps");
    compsFolder.parentFolder = assetsFolder; 

    //ITERATE ARRAYS AND MOVE TO FOLDERS
    //==================================
    for (var i = 0; i < footage.length; i++) {

        var id = footage[i];
        var item = app.project.itemByID(id);

        item.parentFolder = app.project.rootFolder;

        if(item.typeName == "Footage"){
       
            //IS NULL?
            if(item.file){
                
                var format = String(item.file);
                var format = format.substring(format.lastIndexOf("."));

                if(format == '.png' || format == '.jpg' || format == '.gif' || format == '.bmp' || format == '.tga' || format == '.jpeg' || format == '.psd' || format == '.psb'){

                    item.parentFolder = imagesFolder;
                
                }else if(format == '.ai' || format == '.eps' || format == '.pdf'){
     
                    item.parentFolder = graphicsFolder;
                
                }else if(format == '.mov' || format == '.mp4' || format == '.MOV' || format == '.MP4' || format == '.Mp4' ){

                    item.parentFolder = videoFolder;
                
                }else if(format == '.wav' || format == '.aif' || format == '.mp3' || format == '.m4a'){

                    item.parentFolder = audioFolder;
                
                }else if(format == '.swf'){

                    item.parentFolder = swfFolder;

                }
      
            }else{

                item.parentFolder = solidsFolder;

            }

        }else if(item.typeName == "Composition"){

            //item.parentFolder = compsFolder;

            if(item.selected == false){
            
                item.parentFolder = compsFolder;
               
            } 
              
        }

    }

}

//APPLY ARRANGE FUNCTION
//======================
arrange();

//REMOVE UNUSED FILES
//===================
app.project.removeUnusedFootage();

//CONSOLIDATE
//===========
app.project.consolidateFootage();

//REDUCE
//======
app.project.reduceProject(selectedItems);






