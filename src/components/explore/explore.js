/**
 * Explore
 * @author kmturley
 */

// import css from './explore.css!css';
import tpl from './explore.tpl!text';

let Explore = {
    bindings: {},
    template: tpl,
    controller: ['$scope', function($scope) {
        let $ctrl = this;
        console.log('Explore', this);
    }],
};

export default Explore;
