import $ from "jquery";
import waypoints from "../../../../node_modules/waypoints/lib/noframework.waypoints";

class RevealOnScroll {
    constructor(elements, offset) {
        this.itemsToReveal = elements;
        this.offsetPercentage = offset;
        this.hideInitially();
        this.createWaypoints();
    }

    hideInitially() {
        this.itemsToReveal.addClass("reveal-item");
    }

    createWaypoints() {
        var that = this; // At this point this keyword points to main object

        this.itemsToReveal.each(function() {
            var currentItem = this;

            new Waypoint({
                element: currentItem,
                handler: function() {
                    $(currentItem).addClass("reveal-item--is-visible");
                },
                offset: that.offsetPercentage // 100% is when elements touch the very bottom of the screen
            });
        });
    }
}

export default RevealOnScroll;