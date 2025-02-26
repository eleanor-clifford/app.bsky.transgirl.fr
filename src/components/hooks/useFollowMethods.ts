import React from 'react'
import {AppBskyActorDefs} from '@atproto/api'
import {msg} from '@lingui/macro'
import {useLingui} from '@lingui/react'

import {logger} from '#/logger'
import {Shadow} from '#/state/cache/types'
import {useProfileFollowMutationQueue} from '#/state/queries/profile'
import {useRequireAuth} from '#/state/session'
import * as Toast from '#/view/com/util/Toast'

export function useFollowMethods({
  profile,
}: {
  profile: Shadow<AppBskyActorDefs.ProfileViewBasic>
}) {
  const {_} = useLingui()
  const requireAuth = useRequireAuth()
  const [queueFollow, queueUnfollow] = useProfileFollowMutationQueue(
    profile,
  )

  const follow = React.useCallback(() => {
    requireAuth(async () => {
      try {
        await queueFollow()
      } catch (e: any) {
        logger.error(`useFollowMethods: failed to follow`, {message: String(e)})
        if (e?.name !== 'AbortError') {
          Toast.show(_(msg`An issue occurred, please try again.`), 'xmark')
        }
      }
    })
  }, [_, queueFollow, requireAuth])

  const unfollow = React.useCallback(() => {
    requireAuth(async () => {
      try {
        await queueUnfollow()
      } catch (e: any) {
        logger.error(`useFollowMethods: failed to unfollow`, {
          message: String(e),
        })
        if (e?.name !== 'AbortError') {
          Toast.show(_(msg`An issue occurred, please try again.`), 'xmark')
        }
      }
    })
  }, [_, queueUnfollow, requireAuth])

  return {
    follow,
    unfollow,
  }
}
