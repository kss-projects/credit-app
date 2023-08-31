document.addEventListener('DOMContentLoaded', function() {
    var sections = document.querySelectorAll('.section');
    var currentSectionIndex = 0;
    var resetButtons = document.querySelectorAll('.reset');

    sections[currentSectionIndex].classList.add('active');

    document.getElementById('next1').addEventListener('click', function() {
        if (validateSection()) {
            nextSection();
        }
    });

    document.getElementById('prev1').addEventListener('click', function() {
        prevSection();
    });

    document.getElementById('next2').addEventListener('click', function() {
        if (validateSection()) {
            nextSection();
        }
    });

    document.getElementById('prev2').addEventListener('click', function() {
        prevSection();
    });

    document.getElementById('next3').addEventListener('click', function() {
        if (validateSection()) {
            nextSection();
        }
    });

    document.getElementById('prev3').addEventListener('click', function() {
        prevSection();
    });

    document.getElementById('next4').addEventListener('click', function() {
        if (validateSection()) {
            nextSection();
        }
    });

    document.getElementById('prev4').addEventListener('click', function() {
        prevSection();
    });

    document.getElementById('creditApplicationForm').addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateSection()) {
            // submit form
        }
    });


    resetButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            document.getElementById('creditApplicationForm').reset();
            sections[currentSectionIndex].classList.remove('active');
            currentSectionIndex = 0;
            sections[currentSectionIndex].classList.add('active');
        });
    });

    function nextSection() {
        sections[currentSectionIndex].classList.remove('active');
        currentSectionIndex++;
        sections[currentSectionIndex].classList.add('active');
    }

    function prevSection() {
        sections[currentSectionIndex].classList.remove('active');
        currentSectionIndex--;
        sections[currentSectionIndex].classList.add('active');
    }

    function validateSection() {
        var activeSection = sections[currentSectionIndex];
        var inputs = activeSection.querySelectorAll('input[required]');
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].value === '') {
                alert('Please fill out all required fields.');
                return false;
            }
        }
        return true;
    }
});
