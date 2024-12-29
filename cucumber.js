module.exports = {
    default: {
      require: ["./dist/sw-module-tests/stepdefs/**/*.js"], // Pfad zu deinen Step-Definitionen
      //format: ["pretty"],
      paths: ["./sw-module-tests/features/**/*.feature"], // Pfad zu den Feature-Dateien
    },
  };