'use strict';

const mql = window.matchMedia('(max-width: 55em)');
const upBtns = document.querySelectorAll('.upBtn');
const sections = document.querySelectorAll('section');

let mqa = mql.matches;
const SECTION_MARGIN = 150;

function manageUpBtn(value, validator) {
    if (validator) {
        return upBtns.forEach(upBtn => value && (upBtn.closest('section').id === validator.id) ? upBtn.classList.remove('hide') : upBtn.classList.add('hide'));
    }
    upBtns.forEach(upBtn => value ? upBtn.classList.remove('hide') : upBtn.classList.add('hide'));
}

function screenTest(e) {
    mqa = e.matches;
    manageUpBtn(mqa);
}

function goesUp() {
    window.scrollBy({
        top: - window.scrollY,
        behavior: 'smooth'
    });
}

function handleOnScroll() {
    sections.forEach(section => {
        const coords = section.getBoundingClientRect();
        if (coords.top < SECTION_MARGIN) {
                manageUpBtn(mqa, section);
        }
        if (section.id === 'about' && window.scrollY === 0) {
            const element = section.children[0].firstChild;
            element.classList.add('hide');
        }
    })
}

mql.addEventListener('change', screenTest);
upBtns.forEach(upBtn => upBtn.addEventListener('click', goesUp));
window.addEventListener('scroll', handleOnScroll);
