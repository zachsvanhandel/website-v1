(function ($) {
    'use strict'; // Start of use strict

    // Restore scroll to top of page on refresh
    history.scrollRestoration = 'manual';

    // Collapse navbar when anchor link in navbar is clicked
    $('.navbar a[href*=\\#]').on('click', function () {
        $('.navbar-collapse').collapse('hide');
    });

    // Smooth scroll
    $('a').on('click', function (event) {
        if (this.hash !== '') {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top
            }, 1000);
        }
    });

    // Type animation
    $('body').addClass('overflow-hidden'); // Disable scrolling

    var attributes = [
        'a programmer',
        'a team player',
        'a leader',
        'an innovator',
        'an engineer'
    ];
    var randomAttributes = attributes.sort(function () { return 0.5 - Math.random() });
    randomAttributes = randomAttributes.slice(0, 3);

    var instance = new TypeIt('.type-effect', {
        speed: 100,
        startDelay: 1000,
        cursor: false,
        afterComplete: function () {
            setTimeout(function () {
                $('.type-effect-hidden').fadeIn(2000); // Display hidden elements
                $('body').removeClass('overflow-hidden'); // Re-enable scrolling
                instance.destroy();
            }, 1000);
        },
    })
        .type('Hello!')
        .pause(1000)
        .delete()
        .type('Allow me to introduce myself.')
        .pause(1000)
        .delete()
        .type('I am <span class="text-secondary">' + randomAttributes[0] + '.</span>')
        .pause(1000)
        .delete(randomAttributes[0].length + 1)
        .type('<span class="text-secondary">' + randomAttributes[1] + '.</span>')
        .pause(1000)
        .delete(randomAttributes[1].length + 1)
        .type('<span class="text-secondary">' + randomAttributes[2] + '.</span>')
        .pause(1000)
        .delete(randomAttributes[2].length + 1)
        .type('<span class="text-primary">Zach Van Handel.</span>')
        .go();

    // Copy text to clipboard and display tooltip with status
    $('.btn-copy-to-clipboard').tooltip({
        trigger: 'click'
    })

    function displayTooltip(btn, message) {
        $(btn).tooltip('hide')
            .attr('data-original-title', message)
            .tooltip('show');
    }

    function hideTooltip(btn) {
        setTimeout(function () {
            $(btn).tooltip('hide');
        }, 2000);
    }

    var clipboard = new ClipboardJS('.btn-copy-to-clipboard');

    clipboard.on('success', function (e) {
        displayTooltip(e.trigger, 'Copied!');
        hideTooltip(e.trigger);
    });

    clipboard.on('error', function (e) {
        displayTooltip(e.trigger, 'Failed to copy!');
        hideTooltip(e.trigger);
    });
})(jQuery); // End of use strict
