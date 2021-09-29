# My-Gallery

## Folder Structure
* models
    * image.js
* public
    * css
        * index.css
 * src
    * index.js
* views
    * index.hbs
    * detailOfImage.hbs
    * editDetail.hbs
    * addNewImage.hbs

## Tech Stack

HTML, CSS, Bootstrap, Javascript, Node.js, Express.js, MongoDB

## Links

Heroku - https://mygallery1-app.herokuapp.com/

Github - https://github.com/Himanshu44626748/My-Gallery

## Usage

Clone the repo and run `npm i` to install all the required modules and then run `nodemon src/index.js` to start the server. Server will run on port 8000 so open browser and run http://localhost:8000/

## Folder Description

* models/image.js

   This contains the schema of database.
   
* public/css/index.css

   This contains the css of index.hbs file.

* src/index.js

   This file conatins the server side code.
   
* views/index.hbs

   This conatins the html code for home page.
   
* views/detailOfImage.hbs

   This file contains html code to show the detail of image which is clicked.
   
* views/editDetails.hbs

   This file contains the html code of form to change the detail of image.
   
* views/addNewImage.hbs

   This file contains the html code of form through which you can add new image to the gallery.

## Routes

* "/"
  
    Base url which will show you 9 image per page. You can see the detail of image by clicking the on the image which will route to "/show/:id". There is also a button "Add New Image" (redirect to "/new") through which you can add your own image into the gallery.
  
* "/show/:id"

    This route will show you the detail of the image and there will be 2 buttons through which you can edit it and delete it.
    
* "/new"

    When you click the button "Add New Image", this will make the GET request to "/new" and you can see the form with a field Image Name, Image URL, Image Detail. On clicking the "Add" button will make the POST request to "/new" and your image will added in the gallery.

* "/:id/edit"

    When you are seeing the detail of the image, there you will find the "Edit" button, on clicking the button will make GET request to "/:id/edit" and there you will find a form through which you can edit the image and afer clicking "Save" button will make PUT request to "/:id/edit" and changes on the image will be saved.

* "/delete/:id"

    You will find a Delete button on the "/show/:id" which will make the DELETE request to "/delete/:id" and the image will be deleted.
    
* "/find"

    You will find a search bar in the home page through which you can search any image by entering the name of the image. On clicking Search button will make POST request to "/find" and the desired image will be rendered.
