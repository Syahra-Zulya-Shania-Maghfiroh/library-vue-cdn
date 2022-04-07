<template>
    <div>
        <div class="container-fluid px-4">
            <h1 class="mt-4">Student</h1>
            <ol class="breadcrumb mb-4">
                <li class="breadcrumb-item"><a href="">Dashboard</a></li>
                <li class="breadcrumb-item active">Student</li>
            </ol>

            <div class="card mb-4">
                <div class="card-header">
                    <i class="fas fa-table me-1"></i>
                    List Student

                    <button @click="Add()" data-bs-toggle="modal" data-bs-target="#student_modal" class="btn btn-primary btn-sm float-end"><i class="fas fa-plus fa-fw"></i>Add Student</button>
                </div>
                <div class="card-body">
                    <table id="datatablesSimple" class="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>ID STUDENT</th>
                                <th>GRADE NAME</th>
                                <th>PROFILE</th>
                                <th>STUDENT NAME</th>
                                <th>DATE OF BIRTH</th>
                                <th>GENDER</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>ID STUDENT</th>
                                <th>GRADE NAME</th>
                                <th>PROFILE</th>
                                <th>STUDENT NAME</th>
                                <th>DATE OF BIRTH</th>
                                <th>GENDER</th>
                                <th>ACTION</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            <tbody>
                            <tr v-for="ls in list_student" :key="ls">
                                <td>{{ ls.id_student }}</td>
                                <td>{{ ls.grade_name }} ({{ ls.group }}) </td>
                                <td><img :src="api_profile + '/photo/' + ls.profile" width="100" height="150"></td>
                                <td>{{ ls.student_name }}</td>
                                <td>{{ ls.born }}</td>
                                <td>{{ ls.gender }}</td>
                                <td>
                                    <button class="btn btn-default" @click="Edit(ls)" data-bs-toggle="modal" data-bs-target="#profile_modal"><i class="fas fa-image fa-fw"></i></button>
                                    <button class="btn btn-info" @click="Edit(ls)" data-bs-toggle="modal" data-bs-target="#student_modal"><i class="fas fa-pencil-alt fa-fw"></i></button>
                                    <button class="btn btn-danger" @click="Delete(ls.id_student)"><i class="fas fa-trash-alt fa-fw"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="student_modal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Student Data</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="id_grade" class="form-label">Grade</label>
                            <select class="form-control" id="id_grade" v-model="id_grade">
                                <option v-for="lg in list_grade" :key='lg' v-bind:value="lg.id_grade">{{lg.grade_name}} - {{lg.group}}</option>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label for="student_name" class="form-label">Student Name</label>
                            <input type="text" class="form-control" id="student_name" v-model="student_name" placeholder="Student Name">
                        </div>

                        <div class="mb-3">
                            <label for="born" class="form-label">Date Of Birth</label>
                            <input type="date" class="form-control" id="born" v-model="born" placeholder="Date Of Birth">
                        </div>

                        <div class="mb-3">
                            <label for="gender" class="form-label">Gender</label>
                            <select name="gender" v-model="gender" class="form-control">
                                <option></option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label for="address" class="form-label">Address</label>
                            <textarea class="form-control" id="address" v-model="address" rows="3"></textarea>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" @click="Save()" data-bs-dismiss="modal">Submit</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- MODAL PROFILE -->
        <div class="modal fade" id="profile_modal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Profile Data</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        <div class="mb-3">
                            <label for="profile" class="form-label">Profile</label>
                            <input type="file" class="form-control" id="profile" @change="uploadProfile($event)">
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" @click="Upload(id_student)" data-bs-dismiss="modal">Submit</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    module.exports = {
        data : function(){
            return {
                list_student: [],
                list_grade: [],
                id_student: "",
                id_grade: "",
                grade_name: "",
                student_name: "",
                born: "",
                gender: "",
                address: "",
                group: "",
                action: "", //untuk membedakan di BE ini nanti post/put

            }
        },
        methods: {
            getData: function(){
                // token
                let token = {
                    headers: { "Authorization": "Bearer " + this.$cookies.get('Authorization') }
                }
                axios.get(api_url + "/grade", token)
                .then(response => {
                    this.list_grade = response.data;
                }) 
            
                axios.get(api_url + "/student", token)
                .then(response => {
                    this.list_student = response.data;
                })
            },

            Add : function(){
                this.id_grade = "",
                this.id_student = "",
                this.student_name = "",
                this.born = "",
                this.gender = "",
                this.address = "",
                this.action = "insert"
            },

            Edit: function(ls){
                this.id_student=ls.id_student
                this.student_name=ls.student_name
                this.born=ls.born
                this.gender=ls.gender
                this.address=ls.address
                this.id_grade=ls.id_grade
                this.action="update"
            },
            uploadProfile: function(e){
                this.profile = e.target.files[0]
            },
            Upload: function(id_student){
                // mapping header token
                let token = {
                    headers : {"Authorization" : "Bearer" + this.$cookies.get("Authorization")
                    }
                }
                let form = new FormData()
                form.append("profile", this.profile)

                axios.post(api_url + '/student/UploadProfile/' + id_student, form, token)
                .then( response => {
                    Swal.fire({
                        tittle : 'Success!',
                        text : response.data.message,
                        icon : 'success',
                        confirmButtonText : 'OK!'
                    })
                })
            },
            Delete: function(id_student){
                let token = {
                    headers: { "Authorization": "Bearer " + this.$cookies.get('Authorization') }
                }
                Swal.fire({
                title: 'Are you sure delete this data?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                })
                .then((result) => {
                    if (result.isConfirmed){
                        axios.delete(api_url + '/student/' + id_student, token)
                        .then( response => {
                            Swal.fire({
                                tittle : 'Deleted!',
                                text : response.data.message,
                                icon : 'success',
                                confirmButtonText : 'OK!'
                            })

                            this.getData()
                        })

                    } 
                })  
            },

            Save: function() {
                let token = {
                    headers: { "Authorization": "Bearer " + this.$cookies.get('Authorization') }
                }
                //mapping data
                let form  = {
                    //backend       //state
                    'id_grade': this.id_grade,
                    'student_name': this.student_name,
                    'born': this.born,
                    'gender': this.gender,
                    'address': this.address
                }

                if(this.action === 'insert') {
                    axios.post(api_url + '/student', form, token)
                    .then(response => {
                        Swal.fire({
                            tittle : 'Success!',
                            text : response.data.message,
                            icon : 'success',
                            confirmButtonText : 'OK!'
                        })
                    })

                    this.getData()
                } else {
                    axios.put(api_url + '/student/' +this.id_student, form, token)
                    .then(response => {
                        Swal.fire({
                            tittle : 'Success!',
                            text : response.data.message,
                            icon : 'success',
                            confirmButtonText : 'OK!'
                        })

                        this.getData()
                    })
                }
                this.getData()
            }

            
        },
        mounted(){
            this.getData();
        }
    }
</script>
