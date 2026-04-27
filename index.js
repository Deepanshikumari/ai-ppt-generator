const express = require("express");
const PptxGenJS = require("pptxgenjs");

const app = express();
app.use(express.json());

app.post("/generate-ppt", async (req, res) => {
  try {
    const slides = req.body.slides;

    let pptx = new PptxGenJS();

    slides.forEach(slide => {
      let s = pptx.addSlide();
      s.addText(slide.title, { x:1, y:1, fontSize:24 });
      s.addText(slide.content, { x:1, y:2, fontSize:16 });
    });

    const buffer = await pptx.write("nodebuffer");

    res.setHeader("Content-Disposition", "attachment; filename=presentation.pptx");
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.presentationml.presentation");
    res.send(buffer);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
