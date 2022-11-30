# JQuery Carousel and a bootstrap row layout widgets heavily influenced by project below.
Jquery Carousel found in Scripts\ckeditor\plugins\jqcarousel
Bootstrap Grid found in Scripts\ckeditor\plugins\bootstrapgrid


Must You must have:
ckeditor widget plugin installed
config.filebrowserUploadUrl   to the URL which will receive the images as form data
It requires that you setup your own API call to save and serve the images.
Examples of this are in the home controller.

Bootstrap-3.4.1
jquery-3.4.1
jquery.easing.min.js
jquery.fittext.js
jquery.imagedrag.js
jquery-ui-1.12.1.js
jquery-ui-1.12.1.min.js
wow.min.js

Must have jquery and bootstrap loaded during instance ready of the editor   See EditHome.cshtml
CKEDITOR.on('instanceReady', function (ev

Must load bootstrap.min.css in scripts\ckeditor\config.js
Using parameter  config.contentCss = ['../RootPath/To/bootstrap.min.css']


Carousel Heavily influenced by project below. http://startbootstrap.com/template-overviews/creative/
Bootstrapgrid Heavily influenced by project  https://ckeditor.com/cke4/addon/btgrid 



## Copyright and License

The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
