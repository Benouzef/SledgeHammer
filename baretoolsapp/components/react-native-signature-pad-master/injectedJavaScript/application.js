var content = (penColor, backgroundColor, dataURL) => `

  var showSignaturePad = function (signaturePadCanvas, bodyWidth, bodyHeight) {


    var width = bodyWidth;
    var height = bodyHeight;

    var sizeSignaturePad = function () {
      var devicePixelRatio = 1;
      var canvasWidth = width * devicePixelRatio;
      var canvasHeight = height * devicePixelRatio;
      signaturePadCanvas.width = canvasWidth;
      signaturePadCanvas.height = canvasHeight;
      signaturePadCanvas.getContext('2d').scale(devicePixelRatio, devicePixelRatio);
    };

    var finishedStroke = function(base64DataUrl) {
       executeNativeFunction('finishedStroke', {base64DataUrl: base64DataUrl});
    };

    var enableSignaturePadFunctionality = function () {
      var signaturePad = new SignaturePad(signaturePadCanvas, {
        penColor: '${penColor || 'black'}',
        backgroundColor: '${backgroundColor || 'white'}',
        onEnd: function() { finishedStroke(signaturePad.toDataURL()); }
      });

      signaturePad.minWidth = 1;
      signaturePad.maxWidth = 4;
      if ('${dataURL}') {
        signaturePad.fromDataURL('${dataURL}');
      }
    };
    sizeSignaturePad();
    enableSignaturePadFunctionality();
  };


  var bodyWidth = document.body.clientWidth;
  var bodyHeight = document.body.clientHeight;
  if(!bodyWidth) {
    bodyWidth = window.innerWidth;
  }
  if(!bodyHeight) {
    bodyHeight = window.innerHeight;
  }

  var canvasElement = document.querySelector('canvas');
  //showSignaturePad(canvasElement, bodyWidth, bodyHeight);
  showSignaturePad(canvasElement, 200, 200);
`;

export default content;
