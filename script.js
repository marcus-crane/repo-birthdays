(function () {
  function parseURL () {
    const segments = window.location.pathname.split('/').filter(e => e !== '')
    return { 'user': segments[0], 'repo': segments[1] }
  }

  function handleError (response) {
    if (!response.ok) {
      throw Error()
    }
    return response.json()
  }

  function queryRepo (user, repo) {
    fetch(`https://api.github.com/repos/${user}/${repo}`)
      .then(handleError)
      .then(appendDate)
      .catch(error => {
        console.error('[Repo Creation Date] This page isn\'t a valid Github repo')
        return error
      })
  }

  // Thanks to montanaflynn
  // https://gist.github.com/montanaflynn/97af56099dc882a1784c
  function humaniseDate (repoData) {
    const input = new Date(repoData.created_at)
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const monthName = monthNames[input.getMonth()]
    const day = input.getDate()
    const year = input.getFullYear()
    return `${monthName} ${day}, ${year}`
  }

  function appendDate (repoDate) {
    const element = document.querySelector('.pagehead-actions')
    const creationDate = humaniseDate(repoDate)
    // Check that we're on a page with labels
    if (element !== null) {
      const creationDateBadge = `<li>
        <p class="btn btn-sm btn-with-count">
        <svg viewBox="0 0 16 16" version="1.1" height="16" class="octicon octicon-repo-forked mr-1" aria-hidden="true">
          <path fill-rule="evenodd" d="M1.643 3.143L.427 1.927A.25.25 0 000 2.104V5.75c0 .138.112.25.25.25h3.646a.25.25 0 00.177-.427L2.715 4.215a6.5 6.5 0 11-1.18 4.458.75.75 0 10-1.493.154 8.001 8.001 0 101.6-5.684zM7.75 4a.75.75 0 01.75.75v2.992l2.028.812a.75.75 0 01-.557 1.392l-2.5-1A.75.75 0 017 8.25v-3.5A.75.75 0 017.75 4z"/>
        </svg> Created</p>
        <p class="social-count js-social-count" aria-label="This repo was created on ${creationDate}">
          ${creationDate}
        </p>
      </li>`
      element.insertAdjacentHTML('afterbegin', creationDateBadge)
    }
    const smallBadges = document.querySelector('#responsive-meta-container div.mb-3')
    if (smallBadges !== null) {
      const smallCreationDateBadge = `
        <a class="Link--secondary no-underline mr-3">
          <svg viewBox="0 0 16 16" version="1.1" height="16" class="octicon octicon-repo-forked mr-1" aria-hidden="true">
            <path fill-rule="evenodd" d="M1.643 3.143L.427 1.927A.25.25 0 000 2.104V5.75c0 .138.112.25.25.25h3.646a.25.25 0 00.177-.427L2.715 4.215a6.5 6.5 0 11-1.18 4.458.75.75 0 10-1.493.154 8.001 8.001 0 101.6-5.684zM7.75 4a.75.75 0 01.75.75v2.992l2.028.812a.75.75 0 01-.557 1.392l-2.5-1A.75.75 0 017 8.25v-3.5A.75.75 0 017.75 4z"/>
          </svg>
            ${creationDate}
        </a>
      `
      smallBadges.insertAdjacentHTML('afterbegin', smallCreationDateBadge)
    }
  }

  const page = parseURL()
  queryRepo(page.user, page.repo)
})()
