const url = "http://localhost:8080/api";

const header = {
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJ1c2VybmFtZSI6ImJhcmd1biIsInJvbGUiOiIxIn0sImlhdCI6MTcwODU5NjkxNywiZXhwIjoxNzA4NjQwMTE3fQ.CRHtMm6IRGtHJtMUk_vXTBPscquHYiCgUvB2a1rmmoA`
  }
}

const path = "menubar-vehicle";
const id = "65d72bfed3c1b4986d7f35f1";

const add_body = JSON.stringify({
  imgId: "65d74192f07447e7228d859a",
  title:"65d736bdd3c1b4986d7f35f7",
  name:"audi5",
  desc:"asdasd"

});

const update_body = JSON.stringify({
  title: "title10"
});

const switch_body = JSON.stringify(
  {
    "list":
      [
        "65d7384dd3c1b4986d7f35ff",
        "65d736bdd3c1b4986d7f35f7",
        "65d7384ed3c1b4986d7f3602"
      ]
  }
);



describe("car_rent", () => {

  test(`Adding ${path}`, async () => {
    // Title is unique
    const menubar = await fetch(`${url}/${path}`, {
      method: "POST",
      body: add_body,
      ...header
    })
    expect(menubar.status >= 200 && menubar.status <= 299).toBe(true);
  })

  test.skip(`Updating ${path}`, async () => {
    // Title is unique
    const menubar = await fetch(`${url}/${path}/${id}`, {
      method: "PATCH",
      body: update_body,
      ...header
    })
    expect(menubar.status >= 200 && menubar.status <= 299).toBe(true);
  })

  test.skip(`Deleting ${path}`, async () => {
    // Title is unique
    const menubar = await fetch(`${url}/${path}/${id}`, {
      method: "DELETE",
      ...header
    })
    expect(menubar.status >= 200 && menubar.status <= 299).toBe(true);
  })

  test.skip(`Switching Indexes of ${path}`, async () => {
    // Title is unique
    const menubar = await fetch(`${url}/${path}`, {
      method: "PATCH",
      ...header,
      body: switch_body
    })
    expect(menubar.status >= 200 && menubar.status <= 299).toBe(true);
  })

})

test.skip('Get token', async () => {
  const res = await fetch(url + "auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "username": "bargun", "password": "123"
    })
  })
  // @ts-ignore
  const accessToken = (await res.json()).accessToken;
  console.log(accessToken);
  expect(accessToken.length > 100).toBe(true)
})





