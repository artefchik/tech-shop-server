import { Profile } from './profile.interface';

export class ProfileDto {
    id;

    firstname;

    lastname;

    age;

    constructor(data: Profile) {
        this.id = data._id;
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.age = data.age;
    }
}

export type ProfileDtoType = typeof ProfileDto;
