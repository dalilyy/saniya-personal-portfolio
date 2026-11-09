// Assignment #6 — jQuery (Selectors, Effects, DOM Manipulation, Animations)
$(document).ready(function () {
  // Task 0: jQuery setup and ready check.
  console.log("jQuery is ready!");
  $("#jquery-status").text("✓ jQuery is ready! All interactive features are enabled.");

  // Task 1: tag, ID and class selectors; .text(), .css() and theme switching.
  $("h1").css("letter-spacing", "-2px"); // tag selector
  $("#hero-title").text("Hello, I'm Saniya."); // ID selector + .text()
  $(".hero-lead").css("max-width", "480px"); // class selector + .css()
  $("#theme-toggle").on("click", function () {
    $("body").toggleClass("dark-theme");
    const darkMode = $("body").hasClass("dark-theme");
    $(this).text(darkMode ? "Light mode" : "Dark mode").attr("aria-pressed", String(darkMode));
  });

  // Task 2: visibility methods — hide(), show() and toggle().
  $("#hide-facts").on("click", function () { $("#personal-facts").hide(250); });
  $("#show-facts").on("click", function () { $("#personal-facts").show(250); });
  $("#toggle-facts").on("click", function () { $("#personal-facts").toggle(250); });

  // Task 3: fadeIn(), fadeOut() and fadeToggle() on both gallery images.
  $("#fade-in").on("click", function () { $(".gallery-item").stop(true, true).fadeIn(450); });
  $("#fade-out").on("click", function () { $(".gallery-item").stop(true, true).fadeOut(450); });
  $("#fade-toggle").on("click", function () { $(".gallery-item").stop(true, true).fadeToggle(450); });

  // Task 4: slideUp(), slideDown() and slideToggle() for accordion panels.
  $(".accordion-heading").on("click", function () {
    const $heading = $(this);
    const $panel = $heading.next(".accordion-panel");
    const wasOpen = $heading.attr("aria-expanded") === "true";
    // Close any other open panel first, then use slideDown/slideUp explicitly.
    $(".accordion-panel").not($panel).stop(true, true).slideUp(250);
    $(".accordion-heading").not($heading).attr("aria-expanded", "false").find("b").text("+");
    if (wasOpen) {
      $panel.stop(true, true).slideUp(250);
      $heading.attr("aria-expanded", "false").find("b").text("+");
    } else {
      $panel.stop(true, true).slideDown(250);
      $heading.attr("aria-expanded", "true").find("b").text("−");
    }
  });
  // The extra control demonstrates slideToggle() for all accordion panels.
  $("#toggle-panels").on("click", function () {
    $(".accordion-panel").stop(true, true).slideToggle(250);
    const shouldExpand = $(".accordion-heading").first().attr("aria-expanded") !== "true";
    $(".accordion-heading").attr("aria-expanded", String(shouldExpand)).find("b").text(shouldExpand ? "−" : "+");
  });

  // Task 5: append(), prepend(), remove(); reject blank input.
  function addSkill(prepend) {
    const $input = $("#new-skill");
    const skill = $.trim($input.val());
    if (!skill) {
      $("#skill-feedback").text("Please enter a skill before adding it.");
      $input.trigger("focus");
      return;
    }
    const $item = $("<li>").text(skill);
    if (prepend) $("#skill-list").prepend($item);
    else $("#skill-list").append($item);
    $input.val("");
    $("#skill-feedback").text('"' + skill + '" was added to your skills.');
  }
  $("#add-skill").on("click", function () { addSkill(false); });
  $("#prepend-skill").on("click", function () { addSkill(true); });
  $("#new-skill").on("keydown", function (event) { if (event.key === "Enter") { event.preventDefault(); addSkill(false); } });
  $("#remove-skill").on("click", function () {
    const $lastSkill = $("#skill-list li:last");
    if (!$lastSkill.length) { $("#skill-feedback").text("There are no skills left to remove."); return; }
    const removed = $lastSkill.text();
    $lastSkill.remove();
    $("#skill-feedback").text('"' + removed + '" was removed.');
  });

  // Task 6: modify a link destination with .attr().
  let showingLinkedIn = false;
  $("#change-link").on("click", function () {
    showingLinkedIn = !showingLinkedIn;
    const destination = showingLinkedIn ? "https://www.linkedin.com/" : "https://github.com/";
    const label = showingLinkedIn ? "Visit my LinkedIn ↗" : "Visit my GitHub ↗";
    $("#social-link").attr("href", destination).text(label);
    $("#link-feedback").text("Link destination changed to " + (showingLinkedIn ? "LinkedIn." : "GitHub."));
  });

  // Task 7: read input values with .val() and update live text with .text().
  function updatePreview() {
    const name = $.trim($("#visitor-name").val()) || "Not provided";
    const email = $.trim($("#visitor-email").val()) || "Not provided";
    $("#preview-name").text(name);
    $("#preview-email").text(email);
  }
  $("#visitor-name, #visitor-email").on("input", updatePreview);
  $("#contact-form").on("submit", function (event) {
    event.preventDefault();
    const name = $.trim($("#visitor-name").val());
    const email = $.trim($("#visitor-email").val());
    if (!name || !email) {
      $("#form-feedback").text("Please fill in both your name and email.");
      return;
    }
    if (!$("#visitor-email")[0].checkValidity()) {
      $("#form-feedback").text("Please enter a valid email address.");
      return;
    }
    $("#form-feedback").text("Thanks, " + name + "! Your details are shown in the live preview.");
  });
  $("#reset-form").on("click", function () {
    $("#contact-form")[0].reset();
    updatePreview();
    $("#form-feedback").text("The form has been cleared.");
  });
  updatePreview();

  // Task 8: .animate() skill bars to their target widths and back to zero.
  let skillsAreAnimated = false;
  $("#animate-skills").on("click", function () {
    const $bars = $(".meter-fill");
    $bars.stop(true, true);
    if (!skillsAreAnimated) {
      $bars.each(function () {
        const targetWidth = Number($(this).data("width"));
        $(this).animate({ width: targetWidth + "%" }, 900);
      });
      $(this).text("Reset skill bars");
      $("#animation-feedback").text("Skill bars animated to their individual levels.");
    } else {
      $bars.animate({ width: "0%" }, 650);
      $(this).text("Animate my skills");
      $("#animation-feedback").text("Skill bars returned to zero.");
    }
    skillsAreAnimated = !skillsAreAnimated;
  });
});
