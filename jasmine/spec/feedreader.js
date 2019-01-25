/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    describe('RSS Feeds', function() {
        /* Ensure that the allFeeds variable has been
         * defined and that it is not empty.*/
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Ensure allFeeds object has a URL defined
         * and that the URL is not empty.*/
        it('has defined URLs and NOT empty', () => {
            allFeeds.forEach(feed => {
                expect(feed.url).toBeDefined;
                expect(feed.url.length).not.toBe(0);
            });
        })

        /* Ensure allFeeds object has a name defined
         * and that the name is not empty.*/
        it('has defined Names and are NOT empty', () => {
            allFeeds.forEach(feed => {
                expect(feed.name).toBeDefined;
                expect(feed.name.length).not.toBe(0);
            })
        });
    });

    describe('The menu', () => {
        /* Ensure the menu element is
         * hidden by default. */
        it('is hidden by default', () => {
            expect($('body').hasClass('menu-hidden')).toEqual(true)
        });

         /* Ensure the menu changes
          * visibility when the menu icon is clicked. */
        it('changes', () => {
            let menuItemLink = $('.menu-icon-link');
            menuItemLink.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            menuItemLink.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        })
    });

    describe('Initial Entries', () => {
        /* Ensure when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.*/
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });
        it('are loaded and not empty', () => {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });
    describe('New Feed Selections', () => {
        /* Ensure when a new feed is loaded
         * by the loadFeed function that the content actually changes.*/
        let firstFeed, secondFeed;
		beforeEach(function(done) {
            loadFeed(1, function() {
                firstFeed = $('.feed').html();
                loadFeed(2, function() {
                    secondFeed = $('.feed').html();
                    done();
                });
            });        
         });
        it('content changes when new feeds are loaded', () => { 
            expect(firstFeed).not.toEqual(secondFeed);
        });
    });
}());
