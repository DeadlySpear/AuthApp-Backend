const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const router = require("express").Router();

router.get("/", ensureAuthenticated,(req, res) => {
  res.status(200).json([
    {
      product:"mobile",
      price:"1000",
      image: "https://cdn.mos.cms.futurecdn.net/hf2CQvHr9KNtKuUSDkeQVH.jpg"
    },
    {
      product:"laptop",
      price:"2000",
      image: "https://cdn.mos.cms.futurecdn.net/FUi2wwNdyFSwShZZ7LaqWf.jpg"
    },
    {
      product:"tablet",
      price:"1500",
      image: "https://cdn.thewirecutter.com/wp-content/media/2024/05/protablets-2048px-232431.jpg?auto=webp&quality=75&width=1024"
    }
  ]);
});

module.exports = router;