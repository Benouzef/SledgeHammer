var content = script =>
  `<html>
    <style>
    *
    {margin:0;padding:0;}

    canvas
    {
      position:absolute;transform:translateZ(0);

    }

    </style>
    <body>
      Coucou Benoit
      <canvas width="200" height="200" style="margin-left: 0; margin-top: 0;border: 1px solid black;"></canvas>
      <script>
        ${script}
      </script>
      <script>alert('bon alors...');
      </script>
    </body>
  </html>`;

export default content;
