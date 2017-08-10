function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function insertChatroll(){
    var title = jQuery('#chatroll_title').val();
    var height = jQuery('#chatroll_height').val();
    var width = jQuery('#chatroll_width').val();
    var id = jQuery('#chatroll_id').val();
    var name = jQuery('#chatroll_name').val();
    var domain = jQuery('#chatroll_domain').val();
    var align = jQuery('#chatroll_align').val();
    var offsetx = jQuery('#chatroll_offsetx').val();
    var offsety = jQuery('#chatroll_offsety').val();

    window.send_to_editor("[iip_chatroll title=\"" + title + "\" width=\"" + width + "\" height=\"" + height + "\" id=\"" + id + "\" name=\"" + name + "\" domain=\"" + domain + "\" align=\"" + align + "\" offsetX=\"" + offsetx + "\" offsetY=\"" + offsety + "\" ]");
}

function insertCountdown(){
    var countDate = jQuery('#countdown_date').val();
    var countTime = jQuery('#countdown_time').val();
    var countText = jQuery('#countdown_text').val();
    var countWidth = jQuery('#countdown_width').val();
    var countZone = jQuery('#countdown_zone').val();

    window.send_to_editor("[iip_countdown date=\"" + countDate + "\" time=\"" + countTime + "\" text=\"" + countText + "\" width=\"" + countWidth + "\" zone=\"" + countZone + "\" ]");
}

function insertCalendar(){
    var calTitle = jQuery('#calendar_title').val();
    var calDuration = jQuery('#calendar_duration').val();
    var calAddress = jQuery('#calendar_address').val();
    var calDescription = jQuery('#calendar_description').val();
    var calText = jQuery('#calendar_text').val();
    var calDate = jQuery('#calendar_date').val();
    var calTime = jQuery('#calendar_time').val();
    var calZone = jQuery('#calendar_zone').val();

    window.send_to_editor("[iip_calendar title=\"" + calTitle + "\" duration=\"" + calDuration + "\" address=\"" + calAddress + "\" description=\"" + calDescription + "\" text=\"" + calText + "\" date=\"" + calDate + "\" time=\"" + calTime + "\" zone=\"" + calZone + "\" ]");
}

jQuery(document).ready(function($){
    $( "#countdown_date" ).datepicker({
        dateFormat: "mm/dd/yy",
        firstDay: 7 
    });
    $('#countdown_time').timepicker({
        timeFormat: 'h:mm',
        interval: 15,
        minTime: '0',
        maxTime: '11:45pm',
        startTime: '0:00',
        dynamic: false,
        dropdown: true,
        scrollbar: true,
        zindex: 999999
    });
    $( "#calendar_date" ).datepicker({
        dateFormat: "mm/dd/yy",
        firstDay: 7 
    });
    $('#calendar_time').timepicker({
        timeFormat: 'h:mm',
        interval: 15,
        minTime: '0',
        maxTime: '11:45pm',
        startTime: '0:00',
        dynamic: false,
        dropdown: true,
        scrollbar: true,
        zindex: 999999
    });
});