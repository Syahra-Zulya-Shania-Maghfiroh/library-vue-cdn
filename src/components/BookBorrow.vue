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
          <button
            @click="Add()"
            data-bs-toggle="modal"
            data-bs-target="#borrow_modal"
            class="btn btn-primary btn-sm float-end"
          >
            <i class="fas fa-plus fa-fw"></i> Add Borrow
          </button>
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
                  <button
                    class="btn btn-secondary"
                    v-on:click="borrowDetail(lbw.id_borrowing_book)"
                    data-bs-toggle="modal"
                    data-bs-target="#detail_modal"
                  >
                    <i class="fas fa-clipboard"></i></button
                  >&nbsp;
                  <button
                    class="btn btn-info"
                    v-on:click="returnData(lbw.id_borrowing_book)"
                    data-bs-toggle="modal"
                    data-bs-target="#return_modal"
                  >
                    <i class="fas fa-solid fa-check"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- modal borrow -->
      <div
        class="modal fade"
        id="borrow_modal"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">Borrow Data</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-3">
                  <div class="card">
                    <div class="card-body">
                      <div class="mb-3">
                        <label for="id_student" class="form-label"
                          >Student</label
                        >
                        <select
                          class="form-control"
                          id="id_student"
                          v-model="id_student"
                        >
                          <option value="" disabled>
                            -- Choose Student --
                          </option>
                          <option
                            v-for="ls in list_student"
                            :key="ls"
                            v-bind:value="ls.id_student"
                          >
                            {{ ls.student_name }}
                          </option>
                        </select>
                      </div>

                      <div class="mb-3">
                        <label for="born" class="form-label"><h6>The return date of the book will be automatically filled in 7 days after the borrowing date</h6></label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-9">
                  <div class="card">
                    <div class="card-body">
                      <button
                        @click="AddItem"
                        class="btn btn-sm btn-primary text-white"
                      >
                        <i class="mdi mdi-plus btn-icon-prepend"></i>Add Item
                      </button>
                      <br /><br />
                      <div
                        class="row"
                        v-for="(detail, counter) in transaction_detail"
                        :key="counter"
                      >
                        <br /><br />
                        <div class="col-md-8">
                          <div class="form-group">
                            <select
                              class="form-control"
                              v-model="detail.id_book"
                            >
                              <option value="" disabled>
                                -- Choose Book --
                              </option>
                              <option
                                v-for="lb in list_book"
                                :key="lb.id_book"
                                :value="lb.id_book"
                              >
                                {{ lb.book_name }} - {{ lb.author }}
                              </option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-group">
                            <input
                              class="form-control"
                              placeholder="Qty"
                              type="number"
                              v-model="detail.qty"
                            />
                          </div>
                        </div>
                        <div class="col-md-1">
                          <button
                            class="btn btn-danger btn-sm"
                            @click="DeleteItem(counter)"
                          >
                            -
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                class="btn btn-primary"
                @click="Save()"
                data-bs-dismiss="modal"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- modal detail -->
    <div
      class="modal fade"
      id="detail_modal"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="card mb-4">
          <div class="card-body">
            <table
              id="datatablesSimple"
              class="table table-hover table-striped"
            >
              <thead>
                <tr>
                  <th>ID DETAIL</th>
                  <th>BOOK NAME</th>
                  <th>AUTHOR</th>
                  <th>BOOK COVER</th>
                  <th>QTY</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>ID DETAIL</th>
                  <th>BOOK NAME</th>
                  <th>AUTHOR</th>
                  <th>BOOK COVER</th>
                  <th>QTY</th>
                </tr>
              </tfoot>
              <tbody>
                <tr v-for="detail in list_detail_borrow" :key="detail">
                  <td>{{ detail.id_book_loan_details }}</td>
                  <td>{{ detail.book_name }}</td>
                  <td>{{ detail.author }}</td>
                  <td>
                    <img
                      :src="api_cover + '/images/' + detail.image"
                      width="100"
                    />
                  </td>
                  <td>{{ detail.qty }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- modal return -->
    <div
      class="modal fade"
      id="return_modal"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="card mb-4">
          <div class="card-body">
            <table
              id="datatablesSimple"
              class="table table-hover table-striped"
            >
              <thead>
                <tr>
                  <th>ID BORROW</th>
                  <th>DATE OF RETURN</th>
                  <th>FINE</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>ID BORROW</th>
                  <th>DATE OF RETURN</th>
                  <th>FINE</th>
                  <th>ACTION</th>
                </tr>
              </tfoot>
              <tbody>
                <tr v-for="lr in list_return" :key="lr">
                  <td>{{ lr.id_borrowing_book }}</td>
                  <td>{{ lr.dateOfReturn }}</td>
                  <td>{{ lr.fine }}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-secondary btn-sm"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      v-on:click="returnBook(lr.id_borrowing_book)"
                      class="btn btn-primary btn-sm"
                      data-dismiss="modal"
                    >
                      Return Book
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!-- closing modal -->
  </div>
  <!-- </div>
    </div> -->
</template>

<script>
module.exports = {
  data: function () {
    return {
      list_borrow: [],
      list_student: [],
      list_grade: [],
      list_book: [],
      list_detail_borrow: [],
      list_return: [],
      transaction_detail: [],

      // v-model
      id_student: "",
      student_name: "",
      grade_name: "",
      borrow_date: "",
      return_date: "",
      id_book_loan_details: "",
      id_borrowing_book: "",
      detail: "",
      id_book: "",
      book_name: "",
      author: "",
      image: "",
      qty: "",

      Return: [],
      Return: "",
    };
  },
  methods: {
    getData: function () {
      let token = {
        headers: {
          Authorization: "Bearer " + this.$cookies.get("Authorization"),
        },
      };
      axios.get(api_url + "/borrow", token).then((response) => {
        this.list_borrow = response.data;
        console.log(this.list_borrow);
      });

      axios.get(api_url + "/student", token).then((response) => {
        this.list_student = response.data;
      });

      axios.get(api_url + "/book", token).then((response) => {
        this.list_book = response.data;
      });

      axios.get(api_url + "/grade", token).then((response) => {
        this.list_grade = response.data;
      });

      axios.get(api_url + "/detail", token).then((response) => {
        this.list_detail_borrow = response.data;
      });

      axios.get(api_url + "/return", token).then((response) => {
        this.list_return = response.data;
      });
    },
    Add: function () {
      (this.id_student = ""),
      (this.student_name = ""),
      (this.borrow_date = ""),
      (this.return_date = ""),
      (this.action = "insert");
    },
    AddDetail: function (data) {
      this.id_student = data.id_student;
      this.borrow_date = data.borrow_date;
      this.return_date = data.return_date;
    },

    // ADD DETAIL BORROWING BOOK
    AddItem() {
      this.transaction_detail.push({
        id_book: "",
        qty: "",
      });
    },
    DeleteItem(counter) {
      this.transaction_detail.splice(counter, 1);
    },

    Save: function () {
      let token = {
        headers: {
          Authorization: "Bearer " + this.$cookies.get("Authorization"),
        },
      };
      //mapping data
      let form = {
        //backend       //state
        id_student: this.id_student,
        student_name: this.student_name,
        return_date: this.return_date,
        detail: this.transaction_detail,
      };

      if (this.action == "insert") {
        axios.post(api_url + "/borrow", form, token).then((response) => {
          Swal.fire({
            tittle: "Success!",
            text: response.data.message,
            icon: "success",
            confirmButtonText: "OK!",
          });
        });

        this.getData();
      } else {
      }
    },
    borrowDetail(id_book_loan_details) {
      let token = {
        headers: {
          Authorization: "Bearer " + this.$cookies.get("Authorization"),
        },
      };
      // console.log(id);
      axios
        .get(api_url + "/detail/" + id_book_loan_details, token)
        .then((response) => {
          this.list_detail_borrow = response.data;
        });
    },
    returnBook(id_borrowing_book) {
      let token = {
        headers: {
          Authorization: "Bearer " + this.$cookies.get("Authorization"),
        },
      };

      let form = {
        id_borrowing_book: id_borrowing_book,
      };

      axios.post(api_url + "/return" + form, token).then((response) => {
        Swal.fire({
          tittle: "Success!",
          text: response.data.message,
          icon: "success",
          confirmButtonText: "OK!",
        });
        this.getData();
      });
    },
    returnData(id_borrowing_book) {
      let token = {
        headers: {
          Authorization: "Bearer " + this.$cookies.get("Authorization"),
        },
      };
      axios
        .get(api_url + "/return/{id_book_return}/" + id_borrowing_book, token)
        .then((response) => {
          this.list_return = response.data;
        });
    },
    isDisabled() {
      return true;
    },
  },
  mounted() {
    this.getData();
    this.isDisabled();
  },
};
</script>
