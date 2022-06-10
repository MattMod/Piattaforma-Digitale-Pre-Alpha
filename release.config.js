// https://semantic-release.gitbook.io/semantic-release/

module.exports = {
  'branches': [
    'main',
    {
      'name': 'develop',
      'channel': 'channel-${name}',
      'prerelease': true
    },
    {
      'name': 'develop',
      'channel': 'channel-${name}',
      'prerelease': true
    },
    {
      'name': 'test',
      'channel': 'channel-${name}',
      'prerelease': true
    },
  ],
  'tagFormat': '${version}',
  'preset': 'conventionalcommits',
  'plugins': [
    ['@semantic-release/commit-analyzer', {
      }
    ],
    ['@semantic-release/release-notes-generator', {
        'writerOpts': {
          'commitsSort': ['subject', 'scope'],
        }
      }
    ],
    ['@semantic-release/exec', {
        'verifyReleaseCmd': 'echo ${nextRelease.version} > .VERSION',
        'generateNotesCmd': 'echo "${nextRelease.notes}" > .NOTES',
      }
    ],
    ['@semantic-release/changelog', {
        'changelogFile': 'CHANGELOG.md',
        'changelogTitle': '# Monitoraggio.RepubblicaDigitale.Gov.it'
      }
    ],
    ['@semantic-release/git', {
        'assets': ['CHANGELOG.md']
      }
    ],
    ['@semantic-release/github', {
      'assets': [
        {'path': 'CHANGELOG.md'},
      ]
    }],
  ]
}
