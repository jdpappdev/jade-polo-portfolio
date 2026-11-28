(() => {
  const { escapeHTML, safeURL } = window.ProjectBriefSafety;
  const projectTriggers = document.querySelectorAll(
    '.selected-projects-grid [data-project-brief], .creative-card .button-row [data-creative-brief]'
  );
  if (!projectTriggers.length) return;

  const dialog = document.createElement('dialog');
  dialog.className = 'project-brief';
  dialog.setAttribute('aria-labelledby', 'project-brief-label');
  dialog.innerHTML = `
    <div class="project-brief__shell">
      <header class="project-brief__header">
        <p class="project-brief__eyebrow" id="project-brief-label">Project brief</p>
        <button class="project-brief__close" type="button" aria-label="Close project brief">×</button>
      </header>
      <div class="project-brief__body"></div>
    </div>`;
  document.body.append(dialog);

  const body = dialog.querySelector('.project-brief__body');
  const closeButton = dialog.querySelector('.project-brief__close');
  let lastTrigger = null;

  function closeBrief() {
    dialog.close();
    document.body.classList.remove('project-brief-open');
    lastTrigger?.focus();
  }

  function renderBrief(project, isDeveloper) {
    const hero = document.createElement('section');
    hero.className = 'detail-hero';
    const imageUrl = safeURL(project.image);
    const image = isDeveloper
      ? ''
      : imageUrl
        ? `<figure class="detail-visual"><img src="${imageUrl}" alt="${escapeHTML(project.alt)}" loading="lazy"><figcaption>${escapeHTML(project.caption)}</figcaption></figure>`
        : '<div class="image-placeholder"><span>Project overview</span></div>';
    const secondaryUrl = project.repo || project.extra;
    const safeSecondaryUrl = safeURL(secondaryUrl);
    const secondaryLink = safeSecondaryUrl
      ? `<a class="button secondary" target="_blank" rel="noreferrer" href="${safeSecondaryUrl}">${project.repo ? 'View source code' : escapeHTML(project.extraLabel)}</a>`
      : '';
    const primaryUrl = safeURL(project.link);
    const primaryLink = primaryUrl
      ? `<a class="button primary" target="_blank" rel="noreferrer" href="${primaryUrl}">${escapeHTML(project.label)}</a>`
      : '';
    hero.innerHTML = `<div class="wrap detail-grid"><div><p class="eyebrow">${escapeHTML(project.type)}</p><h1>${escapeHTML(project.title)}</h1><p class="lede"><strong>${escapeHTML(project.subtitle)}</strong></p><p>${escapeHTML(project.description)}</p><div class="button-row">${primaryLink}${secondaryLink}</div></div>${image}</div>`;
    body.replaceChildren(hero);

    const steps = (Array.isArray(project.process) ? project.process : []).map((step) => `<li>${escapeHTML(step)}</li>`).join('');
    const detailsSection = document.createElement('section');
    detailsSection.className = 'section rule-top';
    detailsSection.innerHTML = `<div class="wrap"><div class="content-grid"><div><h3>My role</h3><p>${escapeHTML(project.role)}</p><h3 style="margin-top:30px">Process</h3><ul class="list-clean">${steps}</ul></div><aside><div class="callout"><p class="eyebrow">Tools used</p><p>${escapeHTML(project.tools)}</p></div><div class="callout warning" style="margin-top:16px"><p class="eyebrow">Current status</p><p><strong>${escapeHTML(project.status)}</strong></p>${project.limitation ? `<p>${escapeHTML(project.limitation)}</p>` : ''}</div></aside></div></div></section>`;
    const disclosure = document.createElement('details');
    disclosure.className = 'project-brief__details';
    disclosure.innerHTML = '<summary>Project details</summary>';
    disclosure.append(detailsSection);
    body.append(disclosure);
  }

  projectTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const project = trigger.dataset.projectBrief
        ? window.developerBriefs?.[trigger.dataset.projectBrief]
        : window.creativeBriefs?.[trigger.dataset.creativeBrief];
      if (!project) return;
      lastTrigger = trigger;
      const isDeveloper = Boolean(trigger.dataset.projectBrief);
      dialog.classList.toggle('project-brief--developer', isDeveloper);
      renderBrief(project, isDeveloper);
      document.body.classList.add('project-brief-open');
      dialog.show();
    });
  });

  closeButton.addEventListener('click', closeBrief);
  dialog.addEventListener('close', () => document.body.classList.remove('project-brief-open'));
})();
