<template>
    <div>
        <div class="container-fluid px-4">
            <h1 class="mt-4">Book Borrow</h1>
            <ol class="breadcrumb mb-4">
                <li class="breadcrumb-item"><a href="">Dashboard</a></li>
                <li class="breadcrumb-item active">Book Borrow</li>
            </ol>

            <div class="card mb-4">
                <div class="card-header">
                    <i class="fas fa-table me-1"></i>
                    List Book
                    <button @click="Add()" data-bs-toggle="modal" data-bs-target="#borrow_modal" class="btn btn-primary btn-sm float-end"><i class="fas fa-plus fa-fw"></i> Add Borrow</button>
                </div>
                <div class="card-body">
                    <table id="datatablesSimple" class="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>ID BOOK BORROW</th>
                                <th>STUDENT NAME</th>
                                <th>GRADE NAME</th>
                                <th>BORROW DATE</th>
                                <th>RETURN DATE</th>
                                <!-- <th>STATUS</th> -->
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>ID BOOK BORROW</th>
                                <th>STUDENT NAME</th>
                                <th>GRADE NAME</th>
                                <th>BORROW DATE</th>
                                <th>RETURN DATE</th>
                                <!-- <th>STATUS</th> -->
                                <th>ACTION</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            <tr v-for="lbw in list_borrow" :key="lbw">
                                <td>{{ lbw.id_borrowing_book }}</td>
                                <td>{{ lbw.student_name }}</td>
                                <td>{{ lbw.grade_name }}</td>
                                <td>{{ lbw.borrow_date }}</td>
                                <td>{{ lbw.return_date }}</td>
                                <td>
                                    <button class="btn btn-default" @click="Edit(lb)" data-bs-toggle="modal" data-bs-target="#bookcover_modal"><i class="fas fa-image fa-fw"></i></button>
                                    <button class="btn btn-info" @click="Edit(lb)" data-bs-toggle="modal" data-bs-target="#book_modal"><i class="fas fa-pencil-alt fa-fw"></i></button>
                                    <button class="btn btn-danger" @click="Delete(lb.id_book)"><i class="fas fa-trash-alt fa-fw"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- modal -->
            <div class="modal fade" id="borrow_modal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Borrow Data</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="id_student" class="form-label">Student</label>
                                <select class="form-control" id="id_student" v-model="id_student">
                                    <option v-for="ls in list_student" :key='ls' v-bind:value="ls.id_student">{{ls.student_name}}</option>
                                </select>
                            </div>

                            <div class="mb-3">
                                <label for="borrow_date" class="form-label">Borrow Date</label>
                                <input type="date" class="form-control" id="borrow_date" v-model="borrow_date">
                            </div>

                            <div class="mb-3">
                                <label for="born" class="form-label">Return Date</label>
                                <input type="date" class="form-control" id="return_date" v-model="return_date">
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" @click="Save()" data-bs-dismiss="modal">Submit</button>
                        </div>
                    </div>
                </div>
            </div>



            
        </div>
    </div>
</template>

<script>
module.exports = {
    data: function(){
        return {
            list_borrow: [],
            list_student: [],
            list_grade: [],
            list_book: [],
            list_detail: [],
    
            // v-model
            id_student: '',
            student_name: '',
            grade_name: '',
            borrow_date: '',
            return_date: '',

        }
    },
    methods: {
        getData: function(){
             let token = {
                headers: { "Authorization": "Bearer " + this.$cookies.get('Authorization') }
            }
            axios.get(api_url + "/borrow", token)
            .then(response => {
                this.list_borrow = response.data;
                console.log(this.list_borrow)
            })

            axios.get(api_url + "/student", token)
            .then(response => {
                this.list_student = response.data;
            })

            axios.get(api_url + "/grade", token)
            .then(response => {
                this.list_grade = response.data;
            })
        },
        Add : function(){
            this.id_student = "",
            this.student_name = "",
            this.borrow_date = "",
            this.return_date = "",
            this.action = "insert"
        },

        Save: function() {
            let token = {
                headers: { "Authorization": "Bearer " + this.$cookies.get('Authorization') }
            }
            //mapping data
            let form  = {
                //backend       //state
                'id_student' : this.id_student,
                'student_name' : this.student_name,
                'borrow_date' : this.borrow_date,
                'return_date' : this.return_date
            }

            if(this.action == 'insert') {
                axios.post(api_url + '/borrow', form, token)
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

            }
        }
    },
    mounted(){
        this.getData();
    }
}
</script>
