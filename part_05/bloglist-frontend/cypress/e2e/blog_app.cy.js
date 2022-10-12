describe("Blog app", function () {
  let userInfo;

  beforeEach(function () {
    userInfo = {
      name: "Jennifer Loren",
      username: "jennifer_loren",
      password: "jennifer_loren_password",
    };
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    cy.request("POST", "http://localhost:3001/api/users", userInfo);
    cy.visit("http://localhost:3001");
  });

  it("Login form is shown", function () {
    cy.contains("Login to application");
    cy.title("Blog app - FullstackOpen 2022");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("form #username").type(userInfo.username);
      cy.get("form #password").type(userInfo.password);
      cy.get("#login-button").click();

      cy.contains(`${userInfo.name} logged in`);
      cy.get("#logout-button");
    });

    it("fails with wrong credentials", function () {
      cy.get("form #username").type(`${userInfo.username}_typo`);
      cy.get("form #password").type(userInfo.password);
      cy.get("#login-button").click();

      cy.contains(`${userInfo.name} logged in`).should("not.exist");
      cy.get("#login-button");
      cy.get(".message.error").contains("Wrong username and password");
      cy.get(".message.error").should("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("When logged in", function () {
    let blog;

    beforeEach(function () {
      blog = {
        title: "Blog of the day",
        author: "Jennifer Loren",
        likes: 25,
        url: "/blog-123",
      };

      cy.get("form #username").type(userInfo.username);
      cy.get("form #password").type(userInfo.password);
      cy.get("#login-button").click();
    });

    it("A blog can be created", function () {
      cy.contains("New blog").click();
      cy.get("#blog-title").type(blog.title);
      cy.get("#blog-author").type(blog.author);
      cy.get("#blog-url").type(blog.url);
      cy.get("#blog-create-button").click();
      
      cy.contains(`A new blog "${blog.title}" by "${blog.author}" added`);
      cy.get(".blog .title").contains(`${blog.title} - ${blog.author}`);
      cy.get(`.blog button[data-button-text="View"]`);
      cy.get(`.blog .blog-delete-button`).contains("Delete");
    });
  });
});
