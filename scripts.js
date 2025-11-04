
    // Accessible tabs: click + arrow keys
    const tabs = Array.from(document.querySelectorAll('.tab'));
    const panels = Array.from(document.querySelectorAll('.panel'));

    function activateTab(tab) {
      // Update selected state
      tabs.forEach(t => t.setAttribute('aria-selected', String(t === tab)));
      // Show the right panel
      panels.forEach(p => {
        p.hidden = (p.id !== tab.getAttribute('aria-controls'));
      });
      // Move focus to active tab for screen readers if invoked by keyboard
      tab.focus();
    }

    tabs.forEach((tab, idx) => {
      tab.addEventListener('click', () => activateTab(tab));
      tab.addEventListener('keydown', (e) => {
        const { key } = e;
        let newIndex = idx;
        if (key === 'ArrowRight') newIndex = (idx + 1) % tabs.length;
        else if (key === 'ArrowLeft') newIndex = (idx - 1 + tabs.length) % tabs.length;
        else if (key === 'Home') newIndex = 0;
        else if (key === 'End') newIndex = tabs.length - 1;
        else return;
        e.preventDefault();
        activateTab(tabs[newIndex]);
      });
    });
