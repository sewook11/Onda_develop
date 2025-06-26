export type ProfileImage = {
  original: string;
  thumbnail: string;
}

export type SLeader = {
    id: number;
    user_email: string;
    user_name: string;
    user_phone: string;
    user_birthdate?: string;
    user_interests?: string[];
    user_profile_image?: ProfileImage;
    status: ApplicationStatus;
    created_at: string;
    updated_at: string;
}

export type Leader = {
    id: number;
    email: string;
    name: string;
    phone: string;
    birth?: Date;
    interests?: string[];
    profileImage?: string;
    status: ApplicationStatus;
    createdAt: Date;
    updatedAt: Date;
}

export function transformSLeaderToLeader(s: SLeader): Leader {
    return {
      id: s.id,
      email: s.user_email,
      name: s.user_name,
      phone: s.user_phone,
      status: s.status,
      birth: s.user_birthdate ? new Date(s.user_birthdate) : undefined,
      interests: s.user_interests,
      profileImage: s.user_profile_image?.original ?? '',
      createdAt: new Date(s.created_at),
      updatedAt: new Date(s.updated_at),
    };
  }

export type LeaderApplication = {
    bio: string;
    status: ApplicationStatus;
    certificates: Certification[];
}

export type Certification = {
    certificate_type: string;
    file_url: string;
}

export type CertificationRequest = {
  certificate_type: string;
  file: number;
};

export type LeaderApplicationRequest = {
  bio: string;
  certificate_type: string[];
  certificates: CertificationRequest[];
}

export type ApplicationStatus = 'pending' | 'approved' | 'rejected';

export type LeaderApplicationDetail = Leader & LeaderApplication;
export type SLeaderApplicationDetail = SLeader & LeaderApplication;

export function transformSLeaderApplicationDetail(s: SLeaderApplicationDetail): LeaderApplicationDetail {
    return {
      id: s.id,
      email: s.user_email,
      name: s.user_name,
      phone: s.user_phone,
      status: s.status,
      birth: s.user_birthdate ? new Date(s.user_birthdate) : undefined,
      interests: s.user_interests,
      profileImage: s.user_profile_image?.original ?? '',
      createdAt: new Date(s.created_at),
      updatedAt: new Date(s.updated_at),
      bio: s.bio,
      certificates: s.certificates,
    };
  }
  