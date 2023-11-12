import { defineConfig } from "cypress";

export default defineConfig({

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      baseUrl: "http://localhost:3000" // Replace with your API's base URL
    },
    specPattern: "cypress/e2e"
   
    

    
  },

  
});
