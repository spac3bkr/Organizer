//CHECK SELECTIONS
//================
var selectedItems = app.project.selection;

for (var i = 0; i < selectedItems.length; i++) {
  
    var item = selectedItems[i];

    if(item.typeName != "Composition"){//CHECK IF INSTANCEOF WORKS

        selectedItems.splice(i, 1);
                   
    }
            
}

// DIALOG
// ======
var dialog = new Window("dialog"); 
    dialog.text = "Organizer setup"; 
    dialog.orientation = "column"; 
    dialog.alignChildren = ["center","top"]; 
    dialog.spacing = 10; 
    dialog.margins = 16; 

var panel1 = dialog.add("panel", undefined, undefined, {name: "panel1"}); 
    panel1.orientation = "row"; 
    panel1.alignChildren = ["left","top"]; 
    panel1.spacing = 10; 
    panel1.margins = 10; 

var checkboxReduce = panel1.add("checkbox", undefined, undefined, {name: "checkbox1"}); 
    checkboxReduce.text = "Reduce files"; 
    if(selectedItems.length == 0){

        checkboxReduce.enabled = false; 

    }

var checkboxCollect = panel1.add("checkbox", undefined, undefined, {name: "checkbox3"}); 
    checkboxCollect.text = "Collect project"; 

var buttonOk = dialog.add("button", undefined, undefined, {name: "reduceInput_ok"}); 
    buttonOk.text = "Ok"; 
    buttonOk.alignment = ["center","top"]; 

dialog.show();

buttonOk.onClick = arrange();


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

                if(format == '.png' || format == '.jpg' || format == '.gif' || format == '.bmp' || format == '.tga' || format == '.jpeg' || format == '.psd'){

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

//REMOVE UNUSED FILES
//===================
app.project.removeUnusedFootage();

//CONSOLIDATE
//===========
app.project.consolidateFootage();

//REDUCE
//======
if(checkboxReduce.value == true){

    app.project.reduceProject(selectedItems);

} 

//COLLECT
//=======
if(checkboxCollect.value == true){

    app.executeCommand(2482);

} 


/*
//COLLECT via chat gpt
//=======

// Define the destination folder path
var destinationFolder = "C:/Users/Username/Documents/Project Files/";

// Create a new folder in the destination folder
var newFolder = new Folder(destinationFolder + app.project.name);
newFolder.create();

// Collect all project items
var items = app.project.items;

// Loop through all project items
for (var i = 1; i <= items.length; i++) {
  var currentItem = items[i];
  
  // Check if the item is a composition
  if (currentItem instanceof CompItem) {
    
    // Save the composition as a new project file
    var newProjectPath = newFolder.fsName + "/" + currentItem.name + ".aep";
    app.project.save(newProjectPath);
    
  } else if (currentItem instanceof FootageItem) {
    
    // Check if the footage item is a file
    if (currentItem.file != null) {
      
      // Copy the file to the destination folder
      var currentFilePath = currentItem.file.fsName;
      var newFilePath = newFolder.fsName + "/" + currentItem.name;
      File(currentFilePath).copy(newFilePath);
    }
  }
}*/





