(function($) {
  $(document).on('cmb_init', function() {
    // Metabox DOM Selections
    var widgetMetabox = document.getElementById('yali_cb_box_cdp'),
      socialMetabox = document.getElementById('yali_cb_social_links'),
      accordionMetaBox = document.getElementById('yali_cb_accordion'),
      ctaLayoutWidth = document.getElementById('yali_cb_cta_width'),
      filteredListMetaBox = document.getElementById('yali_cb_box_filter'), 
      selectByTaxonomy = $('.cdp-select-posts-by-taxonomy'),
      selectByPostsCategory = $('.cmb2-id-yali-cdp-category'),
      selectByPostsSeries = $('.cmb2-id-yali-cdp-series'),
      selectByPostsTags = $('.cmb2-id-yali-cdp-tag'),
      selectByPostsNum = $('.cmb2-id-yali-cdp-num-posts'),
      selectByPosts = $('.cmb-type-cdp-autocomplete.cmb-repeat'),
      selectByPostsLink = $('.cmb2-id-yali-cdp-autocomplete-related.cmb-repeat'),
      selectByPostsDisplay = $('.cmb2-id-yali-cdp-autocomplete-links-display');


    // Metabox Object store for iterating
    var conditionalMetaboxes = {
      filtered_list: filteredListMetaBox,
      post_list: widgetMetabox,
      social: socialMetabox,
      accordion: accordionMetaBox,
      cta: ctaLayoutWidth
    };


    function toggleConditionalMetaboxes(blockTypeSelection) {
      try {
        for (var type in conditionalMetaboxes) {
          if (type == blockTypeSelection) {
            conditionalMetaboxes[type].style.display = 'block';
          } else {
            conditionalMetaboxes[type].style.display = 'none';
          }
        }
      } catch (err) {}
    }

    function hideAllConditionalMetaboxes() {
      try {
        for (var type in conditionalMetaboxes) {
          conditionalMetaboxes[type].style.display = 'none';
        }
      } catch (err) {}
    }

    // Hide Conditional Boxes based on initial content type selection
    var init_content_type_selection = $("#yali_cb_type").val();
    if( init_content_type_selection === undefined ) {
      return;
    }
    
    if (conditionalMetaboxes[init_content_type_selection] !== undefined) {
      toggleConditionalMetaboxes(init_content_type_selection);
    } else {
      hideAllConditionalMetaboxes();
    }

    // Toggle Metabox display on content type selection
    $('#yali_cb_type').change(function() {
      var blockTypeSelection = $(this).val();

      try {
        // Check if selection exists in metabox store object & toggle display || hide all conditional metaboxes
        if (conditionalMetaboxes[blockTypeSelection] !== undefined) {
          toggleConditionalMetaboxes(blockTypeSelection);
        } else {
          hideAllConditionalMetaboxes();
        }
      } catch (e) {
        console.log('Unable to update the view');
      }
    });

    // Set initial state of post list selection type within the Post List meta box
    var select = $('.cdp-select-posts-by input[type=radio]:checked').val();
    togglePostListFields( select );

    // Set initial state of taxonomy selection within the Post List meta box
    var selectTax = $('.cdp-select-posts-by-taxonomy input[type=radio]:checked').val();
    toggleTaxonomyFields( selectTax );

    // Toggle post list selection type (by recent or custom) when selection is changed
    $('.cdp-select-posts-by input[type=radio]').change(function() {
      var selectBy = $(this).val();
      togglePostListFields( selectBy );
    });

    // Toggle taxonomy selection when selection is changed
    $('.cdp-select-posts-by-taxonomy input[type=radio]').change(function() {
      var selectBy = $(this).val();
      toggleTaxonomyFields( selectBy );
    });

    /**
     * 
     * @param {string} selectBy  how will posts be queried, either by most recent or by individual post selections
     */
    function togglePostListFields( selectBy ) {
      if (selectBy === 'custom') {
        selectByPostsNum.hide();
        selectByTaxonomy.hide();
        selectByPosts.show();
        selectByPostsLink.show();
        selectByPostsDisplay.show();
      } else {
        selectByPostsNum.show();
        selectByTaxonomy.show();
        selectByPosts.hide();
        selectByPostsLink.hide();
        selectByPostsDisplay.hide();
      }
    }

    function toggleTaxonomyFields( taxonomy ) {
      switch (taxonomy) {
        case 'category':
          selectByPostsCategory.show();
          selectByPostsSeries.hide();
          selectByPostsTags.hide();
          break;

        case 'series':
          selectByPostsCategory.hide();
          selectByPostsSeries.show();
          selectByPostsTags.hide();
          break;

        case 'tags':
          selectByPostsCategory.hide();
          selectByPostsSeries.hide();
          selectByPostsTags.show();
          break;

        default:
          selectByPostsCategory.hide();
          selectByPostsSeries.hide();
          selectByPostsTags.hide();
      }
    }

   

    /** @todo toggle bind related links to its correpsonding post
     * Add a corresponding link chooser if a post autocomplete field is added
     */
    // $('.cmb2-id-yali-cdp-autocomplete').on('cmb2_add_row', function(e) {
    //   var selector = $(
    //     'button[data-selector="yali_cdp_autocomplete_links_repeat"]'
    //   );
    //   if (selector) {
    //     selector.trigger('click');
    //   }
    // });

    // /**
    //  * Delete the corresponding link picker if a post autocomplete is deleted
    //  */
    // $('.cmb2-id-yali-cdp-autocomplete').on('click', function(e) {
    //   if (e.target.className === 'button-secondary cmb-remove-row-button') {
    //     var removeBtn = $(e.target);

    //     if (removeBtn instanceof jQuery) {
    //       // get the list of external post links (likn_picker cmb2 fields)
    //       var links = $(
    //         '.cmb2-id-yali-cdp-autocomplete-links.cmb-repeat .cmb-repeat-row'
    //       );

    //       // get the index position of the autocomplete post field row that contains the button
    //       // so the corresponding index in the links list can also be removed
    //       var index = removeBtn.closest('div.cmb-repeat-row').index();

    //       // if corresponding link picker row is found, then remove
    //       if ( index !== -1) {
    //         $(links[index]).remove();
    //       }
    //     }
    //   }
    // });

  });
})(jQuery);
