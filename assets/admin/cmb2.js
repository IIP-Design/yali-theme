(function($) {
  $(document).on("cmb_init", function() {
    // Metabox DOM Selections
    var widgetMetabox = document.getElementById("yali_cb_box_cdp"),
      socialMetabox = document.getElementById("yali_cb_social_links"),
      selectByPosts = $(".cmb-type-cdp-autocomplete.cmb-repeat"),
      selectByPostsLink = $(".cmb2-id-cdp-autocomplete-post-link-group");

    // Metabox Object store for iterating
    var conditionalMetaboxes = {
      post_list: widgetMetabox,
      social: socialMetabox
    };

    function toggleConditionalMetaboxes(blockTypeSelection) {
      try {
        for (var type in conditionalMetaboxes) {
          if (type == blockTypeSelection) {
            conditionalMetaboxes[type].style.display = "block";
          } else {
            conditionalMetaboxes[type].style.display = "none";
          }
        }
      } catch (err) {}
    }

    function hideAllConditionalMetaboxes() {
      try {
        for (var type in conditionalMetaboxes) {
          conditionalMetaboxes[type].style.display = "none";
        }
      } catch (err) {}
    }

    // Hide Conditional Boxes based on initial content type selection
    var init_content_type_selection = $("#yali_cb_type").val();
    if (conditionalMetaboxes[init_content_type_selection] !== undefined) {
      toggleConditionalMetaboxes(init_content_type_selection);
    } else {
      hideAllConditionalMetaboxes();
    }

    // Toggle Metabox display on content type selection
    $("#yali_cb_type").change(function() {
      var blockTypeSelection = $(this).val();

      try {
        // Check if selection exists in metabox store object & toggle display || hide all conditional metaboxes
        if (conditionalMetaboxes[blockTypeSelection] !== undefined) {
          toggleConditionalMetaboxes(blockTypeSelection);
        } else {
          hideAllConditionalMetaboxes();
        }
      } catch (e) {
        console.log("Unable to update the view");
      }
    });

    // toggle select post by within posts box
    $(".cdp-select-posts-by input[type=radio]").change(function() {
      var selectBy = $(this).val();

      if (selectBy === "custom") {
        selectByPosts.show();
        selectByPostsLink.hide();
      } else if (selectBy === "custom_link") {
        selectByPosts.hide();
        selectByPostsLink.show();
      } else {
        selectByPosts.hide();
        selectByPostsLink.hide();
      }
    });
  });
})(jQuery);
