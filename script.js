(() => {
    'use strict';

    const TARGET = new Date(2026, 11, 4, 0, 0, 0); // Dec 4, 2026
    const PROGRESS_START = new Date(2026, 9, 4, 0, 0, 0); // Oct 4, 2026

    const els = {
        days:    document.getElementById('days'),
        hours:   document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds'),
        fill:    document.getElementById('progress-fill'),
        pText:   document.getElementById('progress-text'),
    };

    let prev = { d: null, h: null, m: null, s: null };

    function pad(n) {
        return String(n).padStart(2, '0');
    }

    function applyTick(el, newVal, key) {
        if (prev[key] !== newVal) {
            el.textContent = pad(newVal);
            el.classList.remove('tick');
            void el.offsetWidth;
            el.classList.add('tick');
            prev[key] = newVal;
        }
    }

    function update() {
        const now  = new Date();
        const diff = TARGET - now;

        if (diff <= 0) {
            els.days.textContent    = '00';
            els.hours.textContent   = '00';
            els.minutes.textContent = '00';
            els.seconds.textContent = '00';
            els.fill.style.width    = '100%';
            els.pText.textContent   = '100% of the total wait elapsed - The day has arrived!';
            document.querySelector('.header-label').textContent = 'today is';
            return;
        }

        const totalSec = Math.floor(diff / 1000);
        const d = Math.floor(totalSec / 86400);
        const h = Math.floor((totalSec % 86400) / 3600);
        const m = Math.floor((totalSec % 3600) / 60);
        const s = totalSec % 60;

        applyTick(els.days,    d, 'd');
        applyTick(els.hours,   h, 'h');
        applyTick(els.minutes, m, 'm');
        applyTick(els.seconds, s, 's');

        const total   = TARGET - PROGRESS_START;
        const elapsed = now - PROGRESS_START;
        const pct     = Math.min(Math.max((elapsed / total) * 100, 0), 100);
        els.fill.style.width = pct.toFixed(2) + '%';
        els.pText.textContent = pct.toFixed(1) + '% of the total wait elapsed';

        requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
})();
