<script>
    import { Link } from "svelte-routing";
    import { auth } from "../store/auth";
    import Skeleton from "./ui/Skeleton.svelte";
    import AccordionItem from "./accordion-item.svelte";

    let accordionItems = [];

    auth.subscribe((data) => {
        if (data.filled) {
            accordionItems = filterChildren(data.view.menu.left);
        }
    });

    function filterChildren(data) {
        const a = {};

        for (let xx of data) {
            if (xx.menu_id) {
                a[xx.menu_id] = xx;
            } else {
                a[xx[0].host_id].children = filterChildren(xx);
            }
        }

        return Object.values(a);
    }
</script>

<aside class="aside">
    <div class="aside__inner">
        <div class="aside__accordion accordion">
            {#if $auth.isLoading}
                <div
                    class="accordion__item"
                    style="display: flex; flex-direction: column; gap: 30px;"
                >
                    {#each new Array(7) as _}
                        <div style="overflow: hidden; border-radius: 50px">
                            <Skeleton width="20px" height="20px" />
                        </div>
                    {/each}
                </div>
            {:else}
                {#each accordionItems as items}
                    <AccordionItem {items} idx={items.menu_id} />
                {/each}
            {/if}
        </div>
    </div>
</aside>

<style lang="scss">
    .aside {
        position: fixed;
        z-index: 10;
        top: 90px;
        left: 0;
        bottom: 0;
        background: #fff;
        overflow-y: auto;
    }

    .aside__inner {
        gap: 15px;
        width: 20px;
        padding: 25px 25px;
        transition: width 0.1s linear;
    }

    .aside:hover .aside__inner {
        width: 400px;
    }

    /* =========== Accordion =========== */
    .accordion {
        font-size: 15px;
    }

    .accordion__item:not(:last-child) {
        margin-bottom: 15px;
    }

    .accordion__item-title.aside__current > svg > path {
        fill: #24cffb;
    }

    .accordion__item.active .accordion__item-trigger > svg {
        transform: rotateZ(-180deg);
    }

    .accordion__item-trigger {
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        margin-bottom: 10px;
    }

    .accordion__item-trigger > svg {
        display: none;
        flex-shrink: 0;
        transition: all 0.1s linear;
    }
    .aside:hover .accordion__item-trigger > svg {
        display: block;
    }

    .accordion__item-title {
        display: flex;
        align-items: center;
        margin-right: 5px;
        gap: 20px;
    }
    .accordion__item-title p {
        display: none;
    }
    .aside:hover .accordion__item-title p {
        display: block;
    }
    .accordion__item-title svg {
        flex-shrink: 0;
    }

    .accordion__item-body {
        display: grid;
        grid-template-rows: 0fr;
        font-size: 14px;
        border-left: 1px solid rgba(0, 0, 0, 0.1);
        margin-left: 12px;
        transition: grid-template-rows 0.1s linear;
    }

    .accordion__item-list {
        overflow: hidden;
        margin-left: 50px;
    }

    .accordion__item-link:not(:last-child) {
        margin-bottom: 10px;
    }
</style>
