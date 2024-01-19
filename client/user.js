const image = document.getElementById("imageUpload");
let copper;
window.addEventListener("DOMContentLoaded", () => {
  const val = window.location.pathname.split("/");

  let locate = val[val.length - 1];

  if (locate == "userpage.html" || locate == "tabledata.html") {
    showUserList(locate == "IDcreation.html" ? 1 : 0);
  }
});
let close = 0;
const goUserPage = async () => {
  const adusername = document.getElementById("adusername").value;
  const adpassword = document.getElementById("adpassword").value;

  if (adusername != "" && adpassword != "") {
    const { data } = await axios.post(
      "http://localhost:3030/createId/checkuser",
      {
        data: {
          name: adusername,
          pass: adpassword,
        },
      },
      { withCredential: true }
    );
    if (data.msg == "exist") {
      window.location.href = `./userpage.html?id=${adusername}`;
    } else {
      alert("credential error!!");
    }
  }
};

const insertId = async () => {
  const adusername = document.getElementById("userId").value;
  const adpassword = document.getElementById("userPass").value;
  const { data } = await axios.post(
    "http://localhost:3030/createId/create",
    {
      data: {
        id: adusername,
        pass: adpassword,
      },
    },
    { withCredential: true }
  );

  if (data.msg == "inserted") {
    alert("inserted");
  } else {
    alert("credential error!!");
  }
};

const showUserList = async (locate) => {
  const urlSearchParams = new URLSearchParams(window.location.search);

  const param1Value = urlSearchParams.get("id");

  const { data } = await axios.post(
    "http://localhost:3030/createId/getDataById",
    {
      data: {
        id: param1Value,
      },
    },
    { withCredential: true }
  );
  document.getElementById("userName").value = data.msg.name;
  document.getElementById("sideuserName").value = data.msg.name;
  document.getElementById("selectedImage").src = data.msg.image;
  if (
    data.msg.action &&
    !document.getElementById("action").classList.contains("green")
  ) {
    document.getElementById("action").classList.add("green");
  } else if (document.getElementById("action").classList.contains("green")) {
    document.getElementById("action").classList.remove("green");
  }
};

const showSideBar = () => {
  const parent = document.getElementsByClassName("sideinfo");
  const child = document.getElementsByClassName("sidevalues");
  if (parent[0].classList.contains("phide")) {
    parent[0].classList.toggle("phide");
    child[0].style.transform = "translateX(0%)";
  } else {
    parent[0].classList.toggle("phide");
    child[0].style.transform = "translateX(100%)";
  }
};

const getImageFile = () => {
  document.getElementById("inputimage").click();
};

const handleImageFile = () => {
  const data = document.getElementById("inputimage").files[0];
  const image = document.getElementById("imageUpload");
  let url = "";
  if (data) {
    // Read the selected image file as a Data URL
    const reader = new FileReader();
    reader.onload = function (e) {
      // Save the image data to local storage as a Base64-encoded string

      let src = URL.createObjectURL(data);
      //  (src);
      let canva = document.createElement("canvas");
      let ctx = canva.getContext("2d");
      let userImage = new Image();
      userImage.src = src;
      userImage.onload = () => {
        canva.width = userImage.width;
        canva.height = userImage.height;
        ctx.drawImage(userImage, 0, 0);
        let webpimage = canva.toDataURL("image/webp", 1);
        webpimage;
        image.src = webpimage;
        cropper = new Cropper(image, {
          aspectRatio: 1,
          viewMode: 1,
        });
      };
    };

    reader.readAsDataURL(data);
  }
  // const image = document.getElementById("imageUpload");
};

const uploadImage = async () => {
  const image = document.getElementById("selectedImage");
  const name = document.getElementById("userName").value;
  const urlSearchParams = new URLSearchParams(window.location.search);

  const param1Value = urlSearchParams.get("id");
  document.getElementById("sideuserName").value = name;
  var value = cropper.getCroppedCanvas().toDataURL("image/png");
  image.src = value;
  const { data } = await axios.post(
    "http://localhost:3030/createId/updateId",
    {
      data: {
        id: param1Value,
        name: name,
        image: value,
      },
    },
    { withCredential: true }
  );
  if (data.msg == "updated") {
    alert("updated successfully!!");
    showUserList(1);
  } else {
    alert("update failed");
  }
};

const goToTable = () => {
  window.location.href = `./tabledata.html`;
};
