export interface Patient {
    id: string
    firstName: string
    lastName: string
    email: string
}

export interface HospitalVisit {
    hospitalId: string
    hospitalName: string
    visitDate: Date
}

export interface ExpandablePatient extends Patient {
    hospitalVisits: HospitalVisit[]
}
