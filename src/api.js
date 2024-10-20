// api.js

export const fetchImageUrl = async (fileName) => {
    const baseUrl = "https://en.wikipedia.org/w/api.php";
    const imageParams = {
      action: "query",
      titles: `File:${fileName}`,
      prop: "imageinfo",
      iiprop: "url",
      format: "json",
      origin: "*"
    };
  
    const url = `${baseUrl}?${new URLSearchParams(imageParams).toString()}`;
    
    try {
      const res = await fetch(url);
      const data = await res.json();
      const pages = data.query.pages;
      const imageUrl = Object.values(pages)[0].imageinfo[0].url;
      return imageUrl;
    } catch (error) {
      console.error("Error fetching image URL: ", error);
      return 'placeholder-panda.jpg'; 
    }
  };
  