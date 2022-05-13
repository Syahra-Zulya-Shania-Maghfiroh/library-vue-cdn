<template>
    <div>
         <div class="container-fluid px-4">
            <h1 class="mt-4">Book Return</h1>
            <ol class="breadcrumb mb-4">
                <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
                <li class="breadcrumb-item active">Book Return</li>
            </ol>

            <div class="card mb-4">
                <div class="card-header">
                    <i class="fas fa-table me-1"></i>
                        List Book Return
                </div>
                <div class="card-body">
                    <table id="datatablesSimple" class="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>NO</th>
                                <th>DATE OF RETURN</th>
                                <th>FINE</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(lr, index) in list_return" :key="index">
                                <td> {{ index+1 }} </td>
                                <td> {{ lr.dateOfReturn }} </td>
                                <td> {{ lr.fine }} </td>
                                <td>
                                    <button class="btn btn-info"  v-on:click="editData(member)" type="button" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-pencil-alt fa-fw"></i></button>
                                    <button class="btn btn-danger" v-on:click="deleteData(member.student_id)" ><i class="fas fa-trash-alt fa-fw"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
module.exports = {
    data : function(){
        return {
            list_return: '',
            id_borrowing_book: '',
            dateOfReturn: '',
            fine: '',
        }
    },
    methods: {
        getData: function(){
             let token = {
                headers: { "Authorization": "Bearer " + this.$cookies.get('Authorization') }
            }
            axios.get(api_url + "/return", token)
            .then(response => {
                this.list_return = response.data;
            })
        }
    },
    mounted(){
        this.getData();
    }
}
</script>
