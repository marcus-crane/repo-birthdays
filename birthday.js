(function() {
  function parseURL() {
    var segments = window.location.pathname.split('/').filter(e => e !== '')
    return { "user": segments[0], "repo": segments[1] }
  }

  function queryRepo(user, repo) {
    fetch(`https://api.github.com/repos/${user}/${repo}`)
    .then(r => r.json())
    .then(data => {
      if (data.status === 200) {
        appendDate(data.created_at)
      } else {
        throw new Error()
      }
    })
    .catch(e => console.error("This page isn't a valid repo and that's perfectly fine"))
  }

  // Thanks to montanaflynn
  // https://gist.github.com/montanaflynn/97af56099dc882a1784c
  function humaniseDate(repo_date) {
    var input = new Date(repo_date)
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    var monthName = monthNames[input.getMonth()]
    var day = input.getDate()
    var year = input.getFullYear()
    return `${monthName} ${day}, ${year}`
  }

  function appendDate(repo_date) {
    var element = document.querySelector(".pagehead-actions")
    // Check that we're on a page with labels
    if (element !== null) {
      var birthday = humaniseDate(repo_date)
      var birthdayBadge = `<li>
        <p class="btn btn-sm btn-with-count">
        <svg viewBox="0 0 16 16" version="1.1" height="16" class="octicon octicon-repo-forked" aria-hidden="true">
          <path fill-rule="evenodd" d="M13 4h-1.38c.19-.33.33-.67.36-.91.06-.67-.11-1.22-.52-1.61C11.1 1.1 10.65 1 10.1 1h-.11c-.53.02-1.11.25-1.53.58-.42.33-.73.72-.97 1.2-.23-.48-.55-.88-.97-1.2-.42-.32-1-.58-1.53-.58h-.03c-.56 0-1.06.09-1.44.48-.41.39-.58.94-.52 1.61.03.23.17.58.36.91H1.98c-.55 0-1 .45-1 1v3h1v5c0 .55.45 1 1 1h9c.55 0 1-.45 1-1V8h1V5c0-.55-.45-1-1-1H13zm-4.78-.88c.17-.36.42-.67.75-.92.3-.23.72-.39 1.05-.41h.09c.45 0 .66.11.8.25s.33.39.3.95c-.05.19-.25.61-.5 1h-2.9l.41-.88v.01zM4.09 2.04c.13-.13.31-.25.91-.25.31 0 .72.17 1.03.41.33.25.58.55.75.92L7.2 4H4.3c-.25-.39-.45-.81-.5-1-.03-.56.16-.81.3-.95l-.01-.01zM7 12.99H3V8h4v5-.01zm0-6H2V5h5v2-.01zm5 6H8V8h4v5-.01zm1-6H8V5h5v2-.01z">
          </path>
        </svg>Born</p>
        <p class="social-count js-social-count" aria-label="This repo was born on ${birthday}">
          ${birthday}
        </p>
      </li>`
      element.insertAdjacentHTML('afterbegin', birthdayBadge)
    }
  }

  page = parseURL()
  queryRepo(page.user, page.repo)
})()
