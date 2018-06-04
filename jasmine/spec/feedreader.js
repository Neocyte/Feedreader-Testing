/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    describe('RSS Feeds', function() {

        // Test 1 - allFeeds variable is defined and not empty
        it('have defined feeds', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Test 2 - Each feed has a defined URL that is not empty
         it('have defined URLs', function() {
             allFeeds.forEach(function(element) {
                 expect(element.url).toBeDefined();
                 expect(element.url).not.toBe(0);
             });
         });

        // Test 3 - Each feed has a defined name that is not empty
         it('have defined names', function() {
             allFeeds.forEach(function(element) {
                 expect(element.name).toBeDefined();
                 expect(element.name).not.toBe(0);
             });
         });

    });

    describe('The menu', function() {

        // Test 4 - The menu element is hidden by default
         it('is hidden by default', function() {
             expect($('body').hasClass('menu-hidden')).toBe(true);
         });

         // Test 5 - The menu element toggles visibility when clicking menu icon
          it('is displayed when clicked', function() {
              $('menuIcon').trigger('click');
              expect($('body').hasClass('menu-hidden')).not.toBe(true);

              $('menuIcon').trigger('click');
              expect($('body').hasClass('menu-hidden')).toBe(true);
          });

    });

    describe('Initial Entries', function() {

         /* Test 6 (ASYNC) - When the loadFeed function is completed,
         *  there is at least one .entry element within the .feed container.
         */
         beforeEach(function(done) {
             loadFeed(0, done);
         });

         it('are loaded', function(done) {
             expect($('.feed .entry').length).toBeGreaterThan(0);
             done();
         });
    });

    describe('New Feed Selection', function () {
        var initialFeed;

        // Test 7  (ASYNC) - When a new feed loads, the content changes
         beforeEach(function(done) {
             loadFeed(0, function() {
                 initialFeed = $('.feed').html(); // Stores initial feed
                 loadFeed(1, done); // Loads new feed
             });
         });

         it('changes content', function(done) {
             expect($('.feed').html()).not.toBe(initialFeed);
         });

    });

}());
