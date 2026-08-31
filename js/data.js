/* JerseyHub — product catalogue */

const PRODUCTS = [
  {
    id: "p01", name: "FC Barcelona Home Jersey 2025/26", club: "FC Barcelona",
    category: "club", type: "Home Kit", price: 3499, mrp: 4999, badge: "SALE",
    rating: 4.7, reviews: 312, sizes: ["S","M","L","XL","XXL"],
    art: { primary:"#a50044", secondary:"#004d98", trim:"#edbb00", stripes:true, number:"10", crest:"FCB" }
  },
  {
    id: "p02", name: "Real Madrid Home Jersey 2025/26", club: "Real Madrid",
    category: "club", type: "Home Kit", price: 4299, mrp: 4299, badge: "NEW",
    rating: 4.9, reviews: 480, sizes: ["S","M","L","XL","XXL"],
    art: { primary:"#f5f5f0", secondary:"#00529f", trim:"#00529f", number:"5", crest:"RMA" }
  },
  {
    id: "p03", name: "Manchester United Home Jersey 2025/26", club: "Manchester United",
    category: "club", type: "Home Kit", price: 3999, mrp: 4799, badge: "SALE",
    rating: 4.6, reviews: 265, sizes: ["S","M","L","XL","XXL"],
    art: { primary:"#DA020E", secondary:"#ffe500", trim:"#000000", number:"7", crest:"MUFC" }
  },
  {
    id: "p04", name: "Manchester City Home Jersey 2025/26", club: "Manchester City",
    category: "club", type: "Home Kit", price: 3999, mrp: 3999, badge: "NEW",
    rating: 4.8, reviews: 198, sizes: ["S","M","L","XL","XXL"],
    art: { primary:"#6CABDD", secondary:"#1c2c5b", trim:"#ffffff", number:"17", crest:"MCFC" }
  },
  {
    id: "p05", name: "Paris Saint-Germain Home Jersey 2025/26", club: "PSG",
    category: "club", type: "Home Kit", price: 4199, mrp: 4999, badge: "SALE",
    rating: 4.7, reviews: 221, sizes: ["S","M","L","XL","XXL"],
    art: { primary:"#001e62", secondary:"#da291c", trim:"#ffffff", sash:true, number:"30", crest:"PSG" }
  },
  {
    id: "p06", name: "Liverpool Home Jersey 2025/26", club: "Liverpool",
    category: "club", type: "Home Kit", price: 3899, mrp: 3899, badge: "",
    rating: 4.8, reviews: 356, sizes: ["S","M","L","XL","XXL"],
    art: { primary:"#c8102e", secondary:"#00b2a9", trim:"#f6eb61", number:"11", crest:"LFC" }
  },
  {
    id: "p07", name: "Chelsea Home Jersey 2025/26", club: "Chelsea",
    category: "club", type: "Home Kit", price: 3799, mrp: 4499, badge: "SALE",
    rating: 4.5, reviews: 174, sizes: ["S","M","L","XL","XXL"],
    art: { primary:"#034694", secondary:"#ffffff", trim:"#ffffff", number:"9", crest:"CFC" }
  },
  {
    id: "p08", name: "Juventus Home Jersey 2025/26", club: "Juventus",
    category: "club", type: "Home Kit", price: 3899, mrp: 3899, badge: "NEW",
    rating: 4.6, reviews: 132, sizes: ["S","M","L","XL","XXL"],
    art: { primary:"#1a1a1a", secondary:"#ffffff", trim:"#1a1a1a", stripes:true, number:"7", crest:"JUV" }
  },
  {
    id: "p09", name: "Bayern Munich Home Jersey 2025/26", club: "Bayern Munich",
    category: "club", type: "Home Kit", price: 4099, mrp: 4099, badge: "",
    rating: 4.7, reviews: 156, sizes: ["S","M","L","XL","XXL"],
    art: { primary:"#dc052d", secondary:"#0066b2", trim:"#ffffff", number:"25", crest:"FCB" }
  },
  {
    id: "p10", name: "Arsenal Home Jersey 2025/26", club: "Arsenal",
    category: "club", type: "Home Kit", price: 3799, mrp: 4299, badge: "SALE",
    rating: 4.5, reviews: 121, sizes: ["S","M","L","XL","XXL"],
    art: { primary:"#EF0107", secondary:"#023474", trim:"#ffffff", number:"8", crest:"AFC" }
  },
  {
    id: "p11", name: "Brazil Home Jersey 2026", club: "Brazil",
    category: "national", type: "Home Kit", price: 3699, mrp: 3699, badge: "NEW",
    rating: 4.9, reviews: 402, sizes: ["S","M","L","XL","XXL"],
    art: { primary:"#f6c60d", secondary:"#009739", trim:"#002776", number:"9", crest:"CBF" }
  },
  {
    id: "p12", name: "Argentina Home Jersey 2026", club: "Argentina",
    category: "national", type: "Home Kit", price: 3699, mrp: 4299, badge: "SALE",
    rating: 4.9, reviews: 519, sizes: ["S","M","L","XL","XXL"],
    art: { primary:"#75AADB", secondary:"#ffffff", trim:"#75AADB", stripes:true, number:"10", crest:"AFA" }
  },
  {
    id: "p13", name: "France Home Jersey 2026", club: "France",
    category: "national", type: "Home Kit", price: 3599, mrp: 3599, badge: "",
    rating: 4.6, reviews: 143, sizes: ["S","M","L","XL","XXL"],
    art: { primary:"#0a2a6b", secondary:"#ffffff", trim:"#ed2939", number:"7", crest:"FFF" }
  },
  {
    id: "p14", name: "Portugal Home Jersey 2026", club: "Portugal",
    category: "national", type: "Home Kit", price: 3599, mrp: 4099, badge: "SALE",
    rating: 4.7, reviews: 288, sizes: ["S","M","L","XL","XXL"],
    art: { primary:"#c8102e", secondary:"#006600", trim:"#ffd400", sash:true, number:"7", crest:"FPF" }
  },
  {
    id: "p15", name: "Germany Home Jersey 2026", club: "Germany",
    category: "national", type: "Home Kit", price: 3599, mrp: 3599, badge: "NEW",
    rating: 4.5, reviews: 96, sizes: ["S","M","L","XL","XXL"],
    art: { primary:"#ffffff", secondary:"#000000", trim:"#dd0000", number:"4", crest:"DFB" }
  },
  {
    id: "p16", name: "India National Team Jersey", club: "India",
    category: "national", type: "Home Kit", price: 2999, mrp: 3499, badge: "SALE",
    rating: 4.8, reviews: 231, sizes: ["S","M","L","XL","XXL"],
    art: { primary:"#0a3d0a", secondary:"#ff671f", trim:"#ffffff", number:"12", crest:"AIFF" }
  },
  {
    id: "p17", name: "FC Barcelona Kids Home Jersey", club: "FC Barcelona",
    category: "kids", type: "Kids Kit", price: 1999, mrp: 2499, badge: "SALE",
    rating: 4.6, reviews: 88, sizes: ["16","18","20","22"],
    art: { primary:"#a50044", secondary:"#004d98", trim:"#edbb00", stripes:true, number:"10", crest:"FCB" }
  },
  {
    id: "p18", name: "Real Madrid Kids Home Jersey", club: "Real Madrid",
    category: "kids", type: "Kids Kit", price: 2199, mrp: 2199, badge: "NEW",
    rating: 4.7, reviews: 64, sizes: ["16","18","20","22"],
    art: { primary:"#f5f5f0", secondary:"#00529f", trim:"#00529f", number:"5", crest:"RMA" }
  },
  {
    id: "p19", name: "Manchester United Kids Home Jersey", club: "Manchester United",
    category: "kids", type: "Kids Kit", price: 2099, mrp: 2599, badge: "SALE",
    rating: 4.5, reviews: 57, sizes: ["16","18","20","22"],
    art: { primary:"#DA020E", secondary:"#ffe500", trim:"#000000", number:"7", crest:"MUFC" }
  },
  {
    id: "p20", name: "Design Your Own Custom Jersey", club: "Custom",
    category: "custom", type: "Custom Kit", price: 2499, mrp: 2499, badge: "NEW",
    rating: 4.8, reviews: 176, sizes: ["S","M","L","XL","XXL"],
    art: { primary:"#1a1a1a", secondary:"#E31C25", trim:"#ffffff", number:"00", crest:"JH" }
  },
  {
    id: "p21", name: "Premium Matchday Football Socks", club: "Accessories",
    category: "accessories", type: "Accessory", price: 499, mrp: 699, badge: "SALE",
    rating: 4.3, reviews: 61, sizes: ["Free Size"],
    art: { primary:"#1a1a1a", secondary:"#E31C25", trim:"#ffffff", number:"", crest:"JH", isAccessory:true }
  },
  {
    id: "p22", name: "JerseyHub Captain's Armband", club: "Accessories",
    category: "accessories", type: "Accessory", price: 349, mrp: 349, badge: "",
    rating: 4.2, reviews: 29, sizes: ["Free Size"],
    art: { primary:"#E31C25", secondary:"#1a1a1a", trim:"#ffffff", number:"", crest:"JH", isAccessory:true }
  },
  {
    id: "p23", name: "Official Match Football", club: "Accessories",
    category: "accessories", type: "Accessory", price: 1299, mrp: 1599, badge: "SALE",
    rating: 4.6, reviews: 112, sizes: ["Size 5"],
    art: { primary:"#ffffff", secondary:"#1a1a1a", trim:"#E31C25", number:"", crest:"JH", isAccessory:true }
  },
  {
    id: "p24", name: "PSG Kids Home Jersey", club: "PSG",
    category: "kids", type: "Kids Kit", price: 2099, mrp: 2099, badge: "",
    rating: 4.4, reviews: 33, sizes: ["16","18","20","22"],
    art: { primary:"#001e62", secondary:"#da291c", trim:"#ffffff", sash:true, number:"30", crest:"PSG" }
  }
];

function findProduct(id) {
  return PRODUCTS.find(p => p.id === id);
}
