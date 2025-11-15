const buttons = document.querySelectorAll('.theme-switcher button');

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const flavor = btn.dataset.flavor;       // now "purr", "slumber", or "sunbeam"
        document.documentElement.setAttribute('data-theme', flavor);
        localStorage.setItem('meowllow-theme', flavor);
    });
});

window.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('meowllow-theme');
    if (saved) document.documentElement.setAttribute('data-theme', saved);
});
