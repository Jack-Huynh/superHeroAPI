$(document).ready(function() {
    let searchForm = $('.page-header-search');
    let searchList = $('#search-list');

    let allData;

    let getInputValue = function(event) {
        event.preventDefault();
        let searchText = searchForm.find('input[name="search"]').val();
        fetchAllSuperHero(searchText);
    }

    let fetchAllSuperHero = async function(searchText) {
        let url = `https://www.superheroapi.com/api.php/727054372039115/search/${searchText}`;
        try{
            let response = await fetch(url);
            allData = await response.json();
            if(allData.response === 'success'){
                showSearchList(allData.results);
            }
        } catch(error){
            console.log(error);
        }
    }

    let showSearchList = function(data) {
        searchList.html("");
        data.forEach(dataItem => {
            let divElem = $('<div/>').addClass('search-list-item').html(`
                <img src = "${dataItem.image.url ? dataItem.image.url : ""}" alt = "">
                <p data-id = "${dataItem.id}">${dataItem.name}</p>
            `);
            searchList.append(divElem);
        });
    }

    searchForm.find('input[name="search"]').on('keyup', function() {
        if(searchForm.find('input[name="search"]').val().length > 1){
            fetchAllSuperHero(searchForm.find('input[name="search"]').val());
        } else {
            searchList.html("");
        }
    });

    searchList.on('click', function(event) {
        let searchId = $(event.target).data('id');
        let singleData = allData.results.filter(singleData => {
            return searchId == singleData.id;
        })
        showSuperheroDetails(singleData);
        searchList.html("");
    });

    let showSuperheroDetails = function(data) {
        $('.page-body-content-thumbnail').html(`
            <img src = "${data[0].image.url}">
        `);

        $('.name').text(data[0].name);
        $('.biography').html(`
        <li>
            <span>full name</span>
            <span>${data[0].biography['full-name']}</span>
        </li>
        <li>
            <span>alert-egos</span>
            <span>${data[0].biography['alter-egos']}</span>
        </li>
        <li>
            <span>aliases</span>
            <span>${data[0].biography['aliases']}</span>
        </li>
        <li>
            <span>place-of-birth</span>
            <span>${data[0].biography['place-of-birth']}</span>
        </li>
        <li>
            <span>first-apperance</span>
            <span>${data[0].biography['first-appearance']}</span>
        </li>
        <li>
            <span>publisher</span>
            <span>${data[0].biography['publisher']}</span>
        </li>
        `);
    }
});
