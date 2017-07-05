var logger = (function () {

    return {
      start = function(){
        // This works on all devices/browsers, and uses IndexedDBShim as a final fallback
        var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

        // Open (or create) the database
        var open = indexedDB.open("frlogger", 1);

        // Create the schema
        open.onupgradeneeded = function() {
            var db = open.result;
            var store = db.createObjectStore("logs", {keyPath: "id"});
            var index = store.createIndex("Message", "time", "message");
        };

        open.onsuccess = function() {
            // Start a new transaction
            var db = open.result;
            var tx = db.transaction("Message", "readwrite");
            var store = tx.objectStore("Message");
            var index = store.index("Message");

            // Add some data
            store.put({id: 1, time: Datetime.now, message: "this is a test"});
            store.put({id: 2, time: Datetime.now, message: "this is a test"});

            // Query the data
            //var getJohn = store.get(12345);
            //var getBob = index.get(["Smith", "Bob"]);

            /*getJohn.onsuccess = function() {
                console.log(getJohn.result.name.first);  // => "John"
            };

            getBob.onsuccess = function() {
                console.log(getBob.result.name.first);   // => "Bob"
            };*/

            // Close the db when the transaction is done
            tx.oncomplete = function() {
                db.close();
            };
        }
      },
      add: function(){

      }
    }
})();
