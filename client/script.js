window.addEventListener("DOMContentLoaded", () => {
  const val = window.location.pathname.split("/");
  let locate = val[val.length - 1];

  if (locate == "IDcreation.html" || locate == "tabledata.html") {
    showUserList(locate == "IDcreation.html" ? 1 : 0);
  }
});

const goUserList = () => {
  window.location = "./IDcreation.html";
};

const goAdminPage = async () => {
  const adusername = document.getElementById("adusername").value;
  const adpassword = document.getElementById("adpassword").value;

  if (adusername != "" && adpassword != "") {
    const { data } = await axios.post(
      "http://localhost:3030/check",
      {
          name: adusername,
          pass: adpassword,
      },
      { withCredential: true }
    );
    if (data.msg == "exist") {
      window.location.href = "./IDcreation.html";
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
    showUserList(1);
  } else {
    alert("credential error!!");
  }
};

const showUserList = async (locate) => {
  const val = document.getElementsByClassName("viewlist");
  const { data } = await axios.get(
    "http://localhost:3030/createId/getData",

    { withCredential: true }
  );
  let html = "";
  val[0].innerHTML = "";
  if (locate) {
    for (let i = 0; i < 2; i++) {
      html += `
                <div class="listcon">
                    <div class="listval">${data.msg[i].id}</div>
                    <div class="msgcount">1</div>
                  </div>
                `;
      if (data.msg.length == 1) break;
    }
    html += `<button id="viewbtn" onclick="goToTable()">view</button>`;
  } else {
    html = `<tr>
      <th>User Id</th>
      <th>Name</th>
      <th>Photo</th>
      <th>Action</th>
    </tr>`;
    data.msg.forEach((data) => {
      html += `
      <tr>
      <td>${data.id}</td>
      <td>${data.name}</td>
      <td>
        <img
          src=${data.image}
          alt="" />
      </td>
      <td>
        <div id="action">
          ${
            data.action
              ? `<button onclick='deleteValue(${data.id})'>Delete</button>`
              : `<button  onclick='acceptValue(${data.id})'>Done</button>
          <button  onclick='resetValue(${data.id})'>Delete</button>`
          }
        </div>
      </td>
    </tr>
                `;
    });
  }

  val[0].insertAdjacentHTML("afterbegin", html);
};

const deleteValue = async (val) => {
  const { data } = await axios.post(
    "http://localhost:3030/createId/deleteId",
    {
      data: {
        id: val,
      },
    },

    { withCredential: true }
  );
  if (data.msg == "deleted") {
    alert("deleted successfully!!");
    showUserList(0);
  }
};

const acceptValue = async (val) => {
  const { data } = await axios.post(
    "http://localhost:3030/createId/acceptId",
    {
      data: {
        id: val.toString(),
      },
    },

    { withCredential: true }
  );
  if (data.msg == "deleted") {
    alert("accepted successfully!!");
    showUserList(0);
  }
};

const resetValue = async (val) => {
  const { data } = await axios.post(
    "http://localhost:3030/createId/resetId",
    {
      data: {
        id: val,
      },
    },

    { withCredential: true }
  );
  if (data.msg == "deleted") {
    alert("reseted successfully!!");
    showUserList(0);
  }
};

const goToTable = () => {
  window.location.href = "./tabledata.html";
};
