import a from 'axios'


const useOnfidoApi = () => {
  const onfidoUrl = process.env.REACT_APP_ONFIDO_URL
  const onfidoToken = process.env.REACT_APP_ONFIDO_TOKEN
  const wId = process.env.REACT_APP_WORKFLOW_ID


  const o = a.create({
    baseURL: onfidoUrl,
    headers: {
      Authorization: onfidoToken,
      "Content-Type": 'application/json',
      Accept: 'application/json'
    }
  })


  const createUser = async () => {
    try {
      const creation = await o.post(
        '/applicants',
        JSON.stringify({
          first_name: new Date().getTime(),
          last_name: Math.floor(Math.random() * 1000) + 1
        })
      )

      return ({
        success: true,
        userId: creation.data.id
      })
    } catch (error) {
      return ({ success: false })
    }
  }

  const getSDKToken = async (userId: string) => {

    if (userId && userId.trim() !== '') {
      try {
        const info = await o.post(
          '/sdk_token',
          JSON.stringify({
            applicant_id: userId,
            application_id: '*'
          })
        )
        const data = info.data
        return ({ success: true, token: data.token })

      } catch (error) {
        return ({
          success: false,
          error: { message: 'Failed token generation' }
        })
      }
    } else {
      return ({
        success: false,
        error: { message: 'Applicant ID not provided' }
      })
    }
  }

  const getWorkflowRunId = async (userId: string) => {

    if (userId && userId.trim() !== '') {
      try {
        const info = await o.post(
          '/workflow_runs',
          JSON.stringify({
            applicant_id: userId,
            workflow_id: wId
          })
        )
        const data = info.data
        return ({ success: true, id: data.id })
      } catch (error) {
        return ({
          success: false,
          error: { message: 'Invalid token' },
        })
      }
    } else {
      return ({
        success: false,
        error: { message: 'Invalid user' }
      })
    }
  }

  const getMotionCaptureId = async (userId: string) => {

    return o.get(`/motion_captures?applicant_id=${userId}`)
      .then(info => {
        const motion = info.data.motion_captures[0]
        const id = motion.id

        return id
      })
      .catch(err => {
        return false
      })

  }

  const getMotionFrame = async (userId: string): Promise<{
    success: true;
    buffer: any;
  } | {
    success: false;
  }> => {

    const motionId = await getMotionCaptureId(String(userId))

    const req = await o.get(`/motion_captures/${motionId}/frame`, {
      responseType: 'arraybuffer'
    })
      .then(response => {
        return ({ success: true, buffer: response.data } as { success: true, buffer: any })
      })
      .catch(() => ({ success: false } as { success: false })
      )

    return req
  }

  const deleteUser = async (userId: string) => {

    try {
      await o.delete(`/applicants/${userId}`)
      return ({ success: true })
    } catch (error) {
      return ({ success: false })
    }
  }

  return {
    createUser,
    getSDKToken,
    getWorkflowRunId,
    getMotionFrame,
    deleteUser
  };
};

export default useOnfidoApi;
