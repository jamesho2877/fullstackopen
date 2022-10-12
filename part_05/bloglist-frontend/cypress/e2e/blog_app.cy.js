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
      login(userInfo);

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
        url: "/blog-123",
      };

      login(userInfo);
    });

    it("A blog can be created", function () {
      addNewBlog(blog);
      
      cy.contains(`A new blog "${blog.title}" by "${blog.author}" added`);
      cy.get(".blog .title").contains(`${blog.title} - ${blog.author}`);
      cy.get(`.blog button[data-button-text="View"]`);
      cy.get(`.blog .blog-delete-button`).contains("Delete");
    });

    describe("When there are already blogs from other users", function () {
      let userInfo2, blog2;

      beforeEach(function () {
        userInfo2 = {
          name: "John Smith",
          username: "john_smith",
          password: "john_smith_password",
        };

        blog2 = {
          title: "Blog of the day 2",
          author: "John Smith",
          url: "/blog-456",
        };

        addNewBlog(blog);
        logout();

        cy.request("POST", "http://localhost:3001/api/users", userInfo2);
  
        login(userInfo2);
        addNewBlog(blog2);
      });
      
      it("Onwer can like a blog of himself", function () {
        const blogPostName = `${blog2.title} - ${blog2.author}`;
        cy.get(".blog .title").contains(blogPostName).parents(".blog")
          .within(function () {
            cy.get(`button[data-button-text="View"]`).click();
            cy.contains("Likes: 0");
            cy.get(`.blog-like-button`).click();
            cy.contains("Likes: 1");
          });
      });

      it("Onwer can like a blog of others", function () {
        const blogPostName = `${blog.title} - ${blog.author}`;
        cy.get(".blog .title").contains(blogPostName).parents(".blog")
          .within(function () {
            cy.get(`button[data-button-text="View"]`).click();
            cy.contains("Likes: 0");
            cy.get(`.blog-like-button`).click();
            cy.contains("Likes: 1");
          });
      });

      it("Onwer can delete a blog of himself", function () {
        const blogPostName = `${blog2.title} - ${blog2.author}`;
        cy.get(".blog .title").contains(blogPostName).parents(".blog")
          .within(function () {
            cy.get(`.blog-delete-button`).click();
          }).wait(1000).should("not.exist");
      });

      it("Onwer cannot delete a blog of others", function () {
        const blogPostName = `${blog.title} - ${blog.author}`;
        cy.get(".blog .title").contains(blogPostName).parents(".blog")
          .within(function () {
            cy.get(`.blog-delete-button`).should("not.exist");
          });
      });
    });
  });
});

function login(givenUserInfo) {
  cy.get("form #username").type(givenUserInfo.username);
  cy.get("form #password").type(givenUserInfo.password);
  cy.get("#login-button").click();
}

function logout() {
  cy.get("#logout-button").click();
}

function addNewBlog(givenBlogInfo) {
  cy.contains("New blog").click();
  cy.get("#blog-title").type(givenBlogInfo.title);
  cy.get("#blog-author").type(givenBlogInfo.author);
  cy.get("#blog-url").type(givenBlogInfo.url);
  cy.get("#blog-create-button").click();
  cy.wait(1000);
}
