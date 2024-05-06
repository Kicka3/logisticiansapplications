// export function changeStatus(applicationId: number, newStatus: Status): void {
//   const application = applications.find(app => app.id === applicationId)
//
//   if (application) {
//     application.status = newStatus
//   }
// }
// const BASE_URL = 'http://example.com/api/applications'

// export function changeStatus(applicationId: number, newStatus: Status): void {
//   axios
//     .patch(`${BASE_URL}/${applicationId}`, { status: newStatus })
//     .then(response => {
//       console.log('Status updated successfully:', response.data)
//     })
//     .catch(error => {
//       console.error('Error updating status:', error)
//     })
// }
