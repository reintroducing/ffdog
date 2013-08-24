/**
@author Matt Przybylski
**/
var main = (function($, document, window, undefined) {
    'use strict';

    var $names = $('.names'),
        $output = $('.output'),
        $nameList = $('.name-list'),
        $divisions = $('.divisions'),
        $check = $('.check'),
        $finalizeBtn = $('.btn-finalize'),
        $addMoreBtn = $('.btn-add-more'),
        $removeBtn = $('.btn-remove'),
        $generateBtn = $('.btn-generate'),
        $enterBtn = $('.btn-reenter');

    /* ----------------------------------------------------------------------------- *\
       Public Methods
    \* ----------------------------------------------------------------------------- */

    /**
    @method init

    @return {null}
    **/
    function init() {
        $finalizeBtn.on('click', function(evt) {
            evt.preventDefault();

            hideNames();
        });

        $addMoreBtn.on('click', function(evt) {
            evt.preventDefault();

            addUser();
        });

        $removeBtn.on('click', function(evt) {
            evt.preventDefault();

            removeUser(evt);
        });

        $generateBtn.on('click', function(evt) {
            evt.preventDefault();

            generate();
        });

        $enterBtn.on('click', function(evt) {
            evt.preventDefault();

            showNames();
        });
    }

    /* ----------------------------------------------------------------------------- *\
       Private Methods
    \* ----------------------------------------------------------------------------- */

    /**
    @method addUser
    **/
    function addUser() {
        var $label = $('<label class="manager"><input class="manager span11" type="text" placeholder="Name"><a href="#" class="btn-remove"><i class="icon-remove"></i></a></label>');
        $label.find('.btn-remove').on('click', removeUser);

        $addMoreBtn.before($label);
    }

    /**
    @method removeUser
    **/
    function removeUser(evt) {
        var $btn = $(evt.target);
        $btn.off('click', removeUser);
        $btn.closest('label').remove();
    }

    /**
    @method hideNames
    **/
    function hideNames() {
        $names.hide();
        $output.show();
    }

    /**
    @method showNames
    **/
    function showNames() {
        $names.show();
        $output.hide();

        $nameList.empty();
        $divisions.empty();
    }

    /**
    @method generate
    **/
    function generate() {
        var $managers = _.shuffle($('.manager')),
            $manager = null,
            len = $managers.length;

        $nameList.empty();
        $divisions.empty();

        $.each($managers, function(id, manager) {
            $manager = $(manager);

            $nameList.append('<li>' + $manager.val() + '</li>');

            if ($check.is(':checked')) {
                if (id === 0) {
                    $divisions.append('<li class="heading">Division 1</li>');
                } else if (id === Math.floor(len / 2)) {
                    $divisions.append('<li class="heading">Division 2</li>');
                }

                $divisions.append('<li>' + $manager.val() + '</li>');
            }
        });
    }

    // Expose API publicly
    return {
        init: init
    };
})(jQuery, document, window);

// Initialize on document ready
jQuery(document).ready(function() {
    'use strict';

    main.init();
});