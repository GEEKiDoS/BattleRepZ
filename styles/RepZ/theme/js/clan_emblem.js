var canvas = new fabric.Canvas('emblem');
    $(document).ready(function() {
        /* 
        NOTE: the start and end handlers are events for the <img> elements; the rest are bound to the canvas container.
        */

        function handleDragStart(e) {
            [].forEach.call(shapes, function(img) {
                img.classList.remove('img_dragging');
            });
            this.classList.add('img_dragging');
        }

        function handleDragOver(e) {
            if (e.preventDefault) {
                e.preventDefault(); // Necessary. Allows us to drop.
            }

            e.dataTransfer.dropEffect = 'copy'; // See the section on the DataTransfer object.
            // NOTE: comment above refers to the article (see top) -natchiketa

            return false;
        }

        function handleDragEnter(e) {
            // this / e.target is the current hover target.
            this.classList.add('over');
        }

        function handleDragLeave(e) {
            this.classList.remove('over'); // this / e.target is previous target element.
        }

        function buttonPressed(e) {

            switch (e.keyCode) {

                //Delete button
                case 46:
                    if (canvas.getActiveGroup()) {
                        canvas.getActiveGroup().forEachObject(function(o) {
                            canvas.remove(o);
                        });
                        canvas.discardActiveGroup().renderAll();
                    } else {
                        canvas.remove(canvas.getActiveObject());
                    }
                break;

                //Right arrow
                case 39:
                    if (canvas.getActiveGroup()) {
                        canvas.getActiveGroup().left++;
                        canvas.renderAll();
                    } else {
                        canvas.getActiveObject().left++;
                        canvas.renderAll();
                    }
                break;

                //Left arrow
                case 37:
                    if (canvas.getActiveGroup()) {
                        canvas.getActiveGroup().left--;
                        canvas.renderAll();
                    } else {
                        canvas.getActiveObject().left--;
                        canvas.renderAll();
                    }
                break;

                //Top arrow
                case 38:
                    if (canvas.getActiveGroup()) {
                        canvas.getActiveGroup().top--;
                        canvas.renderAll();
                    } else {
                        canvas.getActiveObject().top--;
                        canvas.renderAll();
                    }
                break;

                //Bottom arrow
                case 40:
                    if (canvas.getActiveGroup()) {
                        canvas.getActiveGroup().top++;
                        canvas.renderAll();
                    } else {
                        canvas.getActiveObject().top++;
                        canvas.renderAll();
                    }
                break;

                //Plus button
                case 187:
                    if (canvas.getActiveGroup()) {
                        canvas.getActiveGroup().forEachObject(function(o) {
                            o.width++;
                            o.height++;
                            o.setCoords();
                        });
                        canvas.getActiveGroup().width++;
                        canvas.renderAll();
                    } else {
                        canvas.getActiveObject().width++;
                        canvas.getActiveObject().height++;
                        canvas.renderAll();
                    }
                break;

                //Minus button
                case 189:
                    if (canvas.getActiveGroup()) {
                        canvas.getActiveGroup().forEachObject(function(o) {
                            o.width--;
                            o.height--;
                            o.setCoords();
                        });
                        canvas.getActiveGroup().width--;
                        canvas.renderAll();
                    } else {
                        canvas.getActiveObject().width--;
                        canvas.getActiveObject().height--;
                        canvas.renderAll();
                    }
                break;


            }

        }

        function render(e) {
            //console.log(canvas.toDatalessJSON());
            var layers = $('#layers ul');
            layers.html('');
            var extObject = 0;
            var i = 0;
            canvas.forEachObject(function(o) {

                if(o._element['currentSrc'].indexOf(";base64") > -1) {
                    var name = "External image #"+extObject++;
                } else {
                    var name = basename(o._element['currentSrc'], '.svg');
                }

                layers.append( "<li onclick=\"bla({0})\" draggable='true' class='layer'>{1}</li>".format(i++, name) );
            });
            //JSON.stringify(canvas.toDatalessJSON()))
        }

        function handleDrop(e) {
            // this / e.target is current target element.

            /*
            if (e.stopPropagation) {
                e.stopPropagation(); // stops the browser from redirecting.
            }
            */

            e.stopPropagation(); // Stops some browsers from redirecting.
            e.preventDefault(); // Stops some browsers from redirecting.

            // handle desktop shapes
            if (e.dataTransfer.files.length > 0) {

                var files = e.dataTransfer.files;
                for (var i = 0, f; f = files[i]; i++) {

                    //We'll do a server side validation aswell on the base64
                    if (files[i].size > 2000000) {
                        alert("Files higher than 2mb are not accepted.");
                        continue;
                    }

                    // Only process image files.
                    if (f.type.match('image.*')) {
                        // Read the File objects in this FileList.
                        var reader = new FileReader();
                        // listener for the onload event
                        reader.onload = function(evt) {
                            // create img element
                            var img = document.createElement('img');
                            var width, height;
                            img.src = evt.target.result;

                            //Constrain width of image
                            if (img.width * 2 > 320) {
                                if (img.width > 320) {
                                    width = 320;
                                } else {
                                    width = img.width;
                                }
                            }

                            //Constrain height of image
                            if (img.height * 2 > 320) {
                                if (img.height > 320) {
                                    height = 320;
                                } else {
                                    height = img.height;
                                }
                            }

                            // put image on canvas
                            var newImage = new fabric.Image(img, {
                                width: width,
                                height: height,
                                // Set the center of the new object based on the event coordinates relative to the canvas container.
                                left: e.layerX - (width / 2),
                                top: e.layerY - (height / 2)
                            });
                            canvas.add(newImage);
                        };
                        // Read in the image file as a data URL.
                        reader.readAsDataURL(f);
                    }
                }
            }

            // handle browser shapes
            else {
                var img = document.querySelector('#shapes img.img_dragging');
                var newImage = new fabric.Image(img, {
                    width: img.width * 2,
                    height: img.height * 2,
                    // Set the center of the new object based on the event coordinates relative to the canvas container.
                    left: e.layerX - ((img.width * 2) / 2),
                    top: e.layerY - ((img.height * 2) / 2)
                });
                canvas.add(newImage);
            }

            return false;
        }

        function handleDragEnd(e) {
            // this/e.target is the source node.
            [].forEach.call(shapes, function(img) {
                img.classList.remove('img_dragging');
            });
        }

        if (Modernizr.draganddrop) {
            // Browser supports HTML5 DnD.

            // Bind the event listeners for the image elements
            var shapes = document.querySelectorAll('#shapes img');
            [].forEach.call(shapes, function(img) {
                img.addEventListener('dragstart', handleDragStart, false);
                img.addEventListener('dragend', handleDragEnd, false);
            });
            // Bind the event listeners for the canvas
            var canvasContainer = document.getElementById('editor');
            canvasContainer.addEventListener('dragenter', handleDragEnter, false);
            canvasContainer.addEventListener('dragover', handleDragOver, false);
            canvasContainer.addEventListener('dragleave', handleDragLeave, false);
            canvasContainer.addEventListener('drop', handleDrop, false);
            canvasContainer.tabIndex = 1000;
            canvasContainer.addEventListener("keydown", buttonPressed, false);
            canvas.on('mouse:move', render);

        } else {
            // Replace with a fallback to a library solution.
            alert("This browser doesn't support the HTML5 Drag and Drop API.");
        }
    });





    //Helpers
    function basename(path, suffix) {
      var b = path;
      var lastChar = b.charAt(b.length - 1);

      if (lastChar === '/' || lastChar === '\\') {
        b = b.slice(0, -1);
      }

      b = b.replace(/^.*[\/\\]/g, '');

      if (typeof suffix === 'string' && b.substr(b.length - suffix.length) == suffix) {
        b = b.substr(0, b.length - suffix.length);
      }

      return b;
    }

    //Format
    if (!String.prototype.format) {
      String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) { 
          return typeof args[number] != 'undefined'
            ? args[number]
            : match
          ;
        });
      };
    }
